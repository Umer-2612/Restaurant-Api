import { Request, Response, Application } from "express";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import routes from "../../routes/index";
import Config from "../env/index";
import OrderSchema from "../../components/orders/model";
import * as Stripe from "stripe";
import { ErrorHandler } from "../../utils/common-function";
import stripeClient from "../stripe/configuration";
import server from "../server";
import OrderService from "../../components/orders/service";

export function setupMiddleware(app: Application): void {
  const corsOptions: CorsOptions = {
    origin: function (origin: string | undefined, callback: any) {
      if (!origin || Config.whiteList.indexOf(origin) !== -1) {
        // Allow requests from whitelisted origins or if there is no origin (e.g. Postman or server-side requests)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (authorization headers, etc.)
  };

  // Add raw body parser middleware ONLY for Stripe webhook route (this must be after JSON parsing)
  app.post(
    "/api/v1/stripe/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      const sig: string | string[] | undefined =
        req.headers["stripe-signature"]; // Retrieve the signature from headers

      let event: Stripe.Stripe.Event;
      const orderService = new OrderService();

      try {
        if (!sig) {
          throw new ErrorHandler({
            statusCode: 400,
            message: "Stripe signature is not found.",
          });
        }

        try {
          // Verify the event with Stripe
          event = stripeClient.webhooks.constructEvent(
            req.body,
            sig,
            Config.stripeConfig.webhookSecretKey
          );
        } catch (error: any) {
          console.error("Stripe webhook verification failed:", error.message);
          return res.status(400).send(`Webhook Error: ${error.message}`);
        }
      } catch (error: any) {
        // this.loggerService.logError(req, error);
        return res.status(400).send(`Webhook Error: ${error.message}`);
      }

      if (event) {
        // Handle the event
        switch (event.type) {
          case "checkout.session.completed":
            const session: any = event?.data?.object;
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

              const socketInstance = await server.getSocketIOInstance();

              const formattedResponse = await orderService.getAllOrders({
                id: String(orderId),
              });

              if (formattedResponse[0].data.length > 0) {
                socketInstance.emit(
                  "orders",
                  JSON.parse(JSON.stringify(formattedResponse[0].data[0]))
                );
              }
            } catch (error) {
              console.error("Error creating order:", error);
              return res.status(500).json({ error: "Internal Server Error" });
            }

            break;
        }
        // Acknowledge receipt of the event
        res.json({ received: true });
      }
    }
  );

  // Middleware for CORS
  app.use(cors(corsOptions));

  // Middleware for parsing URL-encoded bodies (for non-webhook routes)
  app.use(bodyParser.urlencoded({ extended: true }));

  // Middleware for parsing JSON bodies (for non-webhook routes)
  app.use(bodyParser.json());

  // Mount the routes to the Express app
  app.use("/api/v1", routes);
}
