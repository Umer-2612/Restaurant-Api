import { Router } from "express";
import AuthController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";

const router = Router();

router.post("/sign-up", AuthController.signUp);

router.post("/sign-in", AuthController.signIn);

router.post("/sign-out", AuthController.signOut);

router.get("/", AuthMiddleware.authenticate, AuthController.test);

export default router;
