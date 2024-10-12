// paymentController.ts
import e, { Request, Response } from "express";
import stripeClient from "../../config/stripe/configuration";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";
import Config from "../../config/env";
import OrderSchema from "../orders/model";
import OrderService from "../orders/service";
import { IOrderSchema } from "../orders/interface";

class PaymentController {
  private orderService: OrderService;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.orderService = new OrderService();
  }

  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  public createCheckoutSession = async (req: Request, res: Response) => {
    const { cartItems } = req.body; // Get items from the request body

    // Create line items for the checkout session
    const lineItems = cartItems?.items?.map(
      (item: {
        menuId: string;
        name: string;
        price: number;
        quantity: number;
        imagePath: string;
      }) => ({
        price_data: {
          currency: "aud",
          product_data: {
            name: item.name,
            images: [item.imagePath],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })
    );

    try {
      // Create Order and save it to database
      const orderBody = {
        items: cartItems?.items?.map(
          (item: { menuId: string; quantity: number }) => {
            return {
              item: item.menuId,
              quantity: item.quantity,
            };
          }
        ),
        totalPrice: Math.round(cartItems?.totalPrice),
        customerDetails: cartItems?.user,
      };

      const orderDetails: IOrderSchema | null = await this.orderService.create(
        orderBody
      );

      // Create a Checkout session with the line items
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        success_url: "http://localhost:5000/success",
        cancel_url: "http://localhost:5000/cancel",
        metadata: {
          orderId: String(orderDetails?._id), // Attach your order ID as metadata
        },
      });

      // Send the session ID to the frontend
      res.send({ sessionId: session.id });
    } catch (error: any) {
      console.log(error);
      await this.handleError(res, error);
    }
  };

  // New method for handling Stripe webhooks
  public handleWebhook = async (req: Request, res: Response) => {
    const sig: string | string[] | undefined = req.headers["stripe-signature"]; // Retrieve the signature from headers

    let event;

    try {
      if (!sig) {
        throw new ErrorHandler({
          statusCode: 400,
          message: "Stripe signature is not found.",
        });
      }

      // Verify the event with Stripe
      event = stripeClient.webhooks.constructEvent(
        req.body,
        sig,
        Config.stripeConfig.webhookSecretKey
      );
    } catch (err: any) {
      console.error(`Webhook error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session: any = event.data.object;
        const { orderId } = session.metadata;

        try {
          const orderDetails = await OrderSchema.findOne({
            _id: orderId,
            recordDeleted: false,
          });

          if (!orderDetails) {
            throw new ErrorHandler({
              statusCode: 404,
              message: "Order not found.",
            });
          }

          orderDetails.status = "Paid";

          orderDetails.paymentDetails = {
            method: session.payment_method_types[0],
            paymentIntent: session.payment_intent,
            sessionId: session.id,
            totalAmountReceivedInCents: session.amount_total,
            currency: session.currency,
            paymentStatus: session.payment_status,
            customerCardDetails: {
              email: session.customer_details.email,
              name: session.customer_details.name,
              phone: session.customer_details.phone,
            },
          };

          await orderDetails.save();
        } catch (error) {
          console.error("Error creating order:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        break;
    }

    // Acknowledge receipt of the event
    res.json({ received: true });
  };
}

export default new PaymentController();
