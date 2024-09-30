import { Router } from "express";
import ContactRequestFormController from "./controller";

const router = Router();

router.post("/createContactRequestForm", ContactRequestFormController.createContactRequestForm);
router.patch("/updateContactRequestForm/:id", ContactRequestFormController.updateContactRequestForm);
router.get("/getContactRequestForm", ContactRequestFormController.getContactRequestForm);
router.delete("/deleteContactRequestForm/:id", ContactRequestFormController.deleteContactRequestForm);


export default router;
