import { Router } from "express";
import ContactRequestFormController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";

const router = Router();

router.post("/", ContactRequestFormController.createContactRequestForm);

router.patch(
  "/:id",
  AuthMiddleware.authenticate,
  ContactRequestFormController.updateContactRequestForm
);

router.get(
  "/",
  AuthMiddleware.authenticate,
  ContactRequestFormController.getContactRequestForm
);

router.delete(
  "/:id",
  AuthMiddleware.authenticate,
  ContactRequestFormController.deleteContactRequestForm
);

export default router;
