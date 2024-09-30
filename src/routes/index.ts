import { Router } from "express";
import userRouter from "../components/user/router";
import authRouter from "../components/auth/router";
import problemSetRouter from "../components/problem-sets/router";
import menuRouter from "../components/menu/router";
import contactRequestRouter from "../components/contact_us/router";
import ReservationRequestFormRouter from "../components/reservation/router";

const router = Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/problem-set", problemSetRouter);

router.use("/menu", menuRouter);

router.use("/contact-us", contactRequestRouter);

router.use("/reservation", ReservationRequestFormRouter);

export default router;
