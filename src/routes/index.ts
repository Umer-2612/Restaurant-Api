import { Router } from "express";
import userRouter from "../components/user/router";
import authRouter from "../components/auth/router";
import menuRouter from "../components/menu-item/router";
import categoryRouter from "../components/category/router";
import contactRequestRouter from "../components/contact-request/router";
import reservationRequestFormRouter from "../components/reservation/router";
import orderRouter from "../components/order/router";

const router = Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/category", categoryRouter);

router.use("/menu", menuRouter);

router.use("/contact-us", contactRequestRouter);

router.use("/reservation", reservationRequestFormRouter);

router.use("/order", orderRouter);

export default router;
