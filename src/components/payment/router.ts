// paymentRoutes.ts
import { Router } from "express";
import PaymentController from "./controller";
import bodyParser from "body-parser";

const router = Router();

router.post(
  "/create-checkout-session",
  PaymentController.createCheckoutSession
);

// New route for the webhook
// router.post("/webhook", PaymentController.handleWebhook);

export default router;
