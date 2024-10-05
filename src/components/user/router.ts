import { Router } from "express";
import UserController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";

const router = Router();

router.get("/info", AuthMiddleware.authenticate, UserController.userInfo);

export default router;
