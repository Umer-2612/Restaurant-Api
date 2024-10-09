import { Router } from "express";
import OrderController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";

const router = Router();

router.post("/", OrderController.createOrder);

router.get("/", AuthMiddleware.authenticate, OrderController.getOrderDetails);

export default router;
