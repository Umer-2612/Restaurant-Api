import { Router } from "express";
import ReservationRequestFormController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";

const router = Router();

router.get(
  "/",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.getAll
);

router.get(
  "/:id",
  // AuthMiddleware.authenticate,
  ReservationRequestFormController.getOne
);

export default router;
