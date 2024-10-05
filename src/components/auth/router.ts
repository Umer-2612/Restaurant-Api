import { Router } from "express";
import AuthController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";

const router = Router();

router.post("/sign-up", AuthController.signUp);

router.post("/sign-in", AuthController.signIn);

router.get("/sign-out", AuthMiddleware.authenticate, AuthController.signOut);

router.get("/get-profile", AuthMiddleware.authenticate, AuthController.getUserDetails);

router.post("/change-password", AuthMiddleware.authenticate, AuthController.changePassword);

router.post("/forgot-password", AuthController.forgotPassword);

router.post("/reset-password", AuthController.resetPassword);

router.post("/update-profile", AuthMiddleware.authenticate, AuthController.updateProfile);

export default router;
