import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import routes from "../../routes/index";
import Config from "../env/index";
import { ErrorHandler } from "../../utils/common-function";
import stripeClient from "../stripe/configuration";

export function setupMiddleware(app: Application): void {
  const corsOptions = {
    origin: function (origin: string, callback: any) {
      if (Config.whiteList.indexOf(origin) !== -1 || !origin) {
        // Allow requests from whitelisted origins or if there is no origin (e.g. Postman or server-side requests)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (authorization headers, etc.)
  } as CorsOptions;

  // Middleware for CORS
  app.use(cors(corsOptions));

  // Middleware for Stripe Webhook (Stripe needs raw body to verify signature)
  app.post(
    "/stripe/webhook",
    bodyParser.raw({ type: "*/*" }),
    async (req: Request, res: Response) => {
      const sig: string | string[] | undefined =
        req.headers["stripe-signature"];
      let event;

      try {
        if (!sig) {
          throw new ErrorHandler({
            statusCode: 400,
            message: "Stripe signature is not found.",
          });
        }

        // Verify the event came from Stripe using the raw body
        event = stripeClient.webhooks.constructEvent(
          req.body, // Use raw body here
          sig,
          Config.stripeConfig.webhookSecretKey
        );
      } catch (err: any) {
        console.log(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          console.log("PaymentIntent was successful!", paymentIntent);
          break;

        case "payment_intent.payment_failed":
          const paymentError = event.data.object;
          console.log(
            "Payment failed:",
            paymentError?.last_payment_error?.message
          );

        case "charge.succeeded":
          const paymentIntent1 = event.data.object;
          console.log("PaymentIntent was successful!", paymentIntent1);

          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      // Acknowledge receipt of the event
      res.json({ received: true });
    }
  );

  // Middleware for parsing URL-encoded bodies (for non-webhook routes)
  app.use(bodyParser.urlencoded({ extended: true }));

  // Middleware for parsing JSON bodies (for non-webhook routes)
  app.use(bodyParser.json());

  // Mount the routes to the Express app
  app.use(routes);
}
