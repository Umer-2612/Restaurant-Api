import { Request, Response, Router } from "express";
import stripeClient from "./configuration";

const router = Router();

router.post("/create-payment-intent", async (req: Request, res: Response) => {
  const { amount, currency, paymentMethodType } = req.body;

  try {
    // Create a Payment Intent with the amount and currency
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"], // e.g., ['card']
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

// router.post("/webhook",

export default router;
