import { Router } from "express";
import ReservationRequestFormController from "./controller";

const router = Router();

router.post("/createReservationRequestForm", ReservationRequestFormController.createReservationRequestForm);
router.patch("/updateReservationRequestForm/:id", ReservationRequestFormController.updateReservationRequestForm);
router.get("/getReservationRequestForm", ReservationRequestFormController.getReservationRequestForm);
router.delete("/deleteReservationRequestForm/:id", ReservationRequestFormController.deleteReservationRequestForm);


export default router;
