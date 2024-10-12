import { Router } from "express";
import ReservationRequestFormController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";

const router = Router();

router.post("/", ReservationRequestFormController.create);

router.put(
  "/:id",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.update
);

router.patch(
  "/:id",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.update
);

router.get(
  "/",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.getAll
);

router.delete(
  "/:id",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.delete
);

export default router;
