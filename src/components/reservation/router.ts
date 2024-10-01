import { Router } from "express";
import ReservationRequestFormController from "./controller";

const router = Router();

router.post("/", ReservationRequestFormController.createReservationRequestForm);
router.patch("/:id", ReservationRequestFormController.updateReservationRequestForm);
router.get("/", ReservationRequestFormController.getReservationRequestForm);
router.delete("/:id", ReservationRequestFormController.deleteReservationRequestForm);


export default router;
