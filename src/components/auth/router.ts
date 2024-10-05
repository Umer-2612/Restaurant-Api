import { Router } from "express";
import AuthController from "./controller";
import authenticate  from "../../config/middleware/auth";

const router = Router();

router.post("/sign-up", AuthController.signUp);

router.post("/sign-in", AuthController.signIn);

router.post("/sign-out", AuthController.signOut);

router.get("/", authenticate.authenticate, AuthController.test);

export default router;
