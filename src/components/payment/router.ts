// paymentRoutes.ts
import { Router } from "express";
import PaymentController from "./controller";

const router = Router();

router.post(
  "/create-cod-order",
  PaymentController.createCashOnDeliveryOrder
);

router.post(
  "/create-checkout-session",
  PaymentController.createCheckoutSession
);

// New route for the webhook
router.post("/webhook", PaymentController.handleWebhook);

export default router;
