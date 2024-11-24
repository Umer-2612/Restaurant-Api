// paymentController.ts
import { Request, Response } from "express";
import stripeClient from "../../config/stripe/configuration";
import { ErrorHandler } from "../../utils/common-function";
import Generator from "../../utils/generator";
import Config from "../../config/env";
import OrderService from "../orders/service";
import { IOrderSchema } from "../orders/interface";
import server from "../../config/server";
import ThermalService from "../../config/node-thermal-printer/service";
import { sendNotification } from "../../services/notificationService";

// const { ThermalPrinter, PrinterTypes } = require("node-thermal-printer");

class PaymentController {
  private orderService: OrderService;
  private thermalService: ThermalService;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.orderService = new OrderService();
    this.thermalService = new ThermalService();
  }

  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  public createCashOnDeliveryOrder = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      let body = req.body;

      body = {
        items: body.items.map((item: { menuId: string; quantity: number }) => {
          return {
            item: item.menuId,
            quantity: item.quantity,
          };
        }),
        totalPrice: Math.round(body.totalPrice),
      };

      body.paymentMethod = "COD";
      body.status = "POD";
      body.customerDetails = req.body.user;

      const order = await this.orderService.create(body);
      const socketInstance = await server.getSocketIOInstance();

      const formattedResponse = await this.orderService.getAllOrders({
        id: String(order._id),
      });

      if (formattedResponse[0].data.length > 0) {
        socketInstance.emit(
          "orders",
          JSON.parse(JSON.stringify(formattedResponse[0].data[0]))
        );
        const customerName =
          body.customerDetails.firstName + body.customerDetails.lastName;

        // Send notification to the topic
        await sendNotification(
          "MyNews",
          `${customerName} placed an Order`,
          `Order for ${body.items.length} items has been placed.`
        );

        await this.thermalService.printReceipt(formattedResponse[0].data[0]);
      }

      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Cash on delivery order created successfully",
        data: order,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  };

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
            // images: [item.imagePath],
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
        success_url: `${
          Config.stripeConfig.redirectUrl
        }?status=success&orderId=${String(orderDetails._id)}`,
        cancel_url: `${
          Config.stripeConfig.redirectUrl
        }?status=failed&orderId=${String(orderDetails._id)}`,
        metadata: {
          orderId: String(orderDetails?._id), // Attach your order ID as metadata
        },
      });

      // Send the session ID to the frontend
      res.send({ sessionId: session.id });
    } catch (error: any) {
      //  await this\.loggerService\.logError\(req, error\);
      await this.handleError(res, error);
    }
  };
}

export default new PaymentController();
