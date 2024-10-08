import Stripe from "stripe";
import Config from "../env";

const stripeClient = new Stripe(Config.stripeConfig.secretKey);

export default stripeClient;
