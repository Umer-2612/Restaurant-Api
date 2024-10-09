import { Router } from "express";
import userRouter from "../components/user/router";
import authRouter from "../components/auth/router";
import menuRouter from "../components/menu-item/router";
import categoryRouter from "../components/category/router";
import contactRequestRouter from "../components/contact-request/router";
import ReservationRequestFormRouter from "../components/reservation/router";
import stripeRouter from "../config/stripe/service";

const router = Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/category", categoryRouter);

router.use("/menu", menuRouter);

router.use("/contact-us", contactRequestRouter);

router.use("/reservation", ReservationRequestFormRouter);

router.use("/stripe", stripeRouter);

export default router;
