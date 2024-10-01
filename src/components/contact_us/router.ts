import { Router } from "express";
import ContactRequestFormController from "./controller";

const router = Router();

router.post("/", ContactRequestFormController.createContactRequestForm);
router.patch("/:id", ContactRequestFormController.updateContactRequestForm);
router.get("/", ContactRequestFormController.getContactRequestForm);
router.delete("/:id", ContactRequestFormController.deleteContactRequestForm);


export default router;
