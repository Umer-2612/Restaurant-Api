import { Router } from "express";
import ReservationRequestFormController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";

const router = Router();

router.post("/", ReservationRequestFormController.createReservationRequestForm);

router.put(
  "/:id",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.updateReservationRequestForm
);

router.patch(
  "/:id",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.updateReservationRequestForm
);

router.get(
  "/",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.getReservationRequestForm
);

router.delete(
  "/:id",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.deleteReservationRequestForm
);

export default router;
