import { Router } from "express";
import userRouter from "../components/user/router";
import authRouter from "../components/auth/router";
import problemSetRouter from "../components/problem-sets/router";

const router = Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/problem-set", problemSetRouter);

export default router;
