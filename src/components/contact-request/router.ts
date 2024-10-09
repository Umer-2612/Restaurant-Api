import { Router } from "express";
import ContactRequestFormController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";

const router = Router();

router.post("/", ContactRequestFormController.create);

router.patch(
  "/:id",
  AuthMiddleware.authenticate,
  ContactRequestFormController.update
);

router.get(
  "/",
  AuthMiddleware.authenticate,
  ContactRequestFormController.getAll
);

router.delete(
  "/:id",
  AuthMiddleware.authenticate,
  ContactRequestFormController.delete
);

export default router;
