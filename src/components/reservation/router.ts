/**
 * @module src/components/reservation/router
 * @description Reservation Request Form Router
 */
import { Router } from "express";
import ReservationRequestFormController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";

/**
 * Express Router for handling reservation request form related requests
 * @constant {Router} router
 */
const router = Router();

/**
 * Creates a new Reservation Request Form
 * @method POST /
 * @param {IReservationRequestSchema} request.body - Reservation Request Form data
 * @returns {Promise<IReservationRequestSchema>} newly created Reservation Request Form
 * @throws {ErrorHandler} if error occurs while creating Reservation Request Form
 */
router.post("/", ReservationRequestFormController.createReservationRequestForm);

/**
 * Updates an existing Reservation Request Form
 * @method PATCH /:id
 * @param {string} request.params.id - id of the Reservation Request Form to be updated
 * @param {IReservationRequestSchema} request.body - Reservation Request Form data
 * @returns {Promise<IReservationRequestSchema | null>} updated Reservation Request Form
 * @throws {ErrorHandler} if error occurs while updating Reservation Request Form
 */
router.patch(
  "/:id",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.updateReservationRequestForm
);

/**
 * Gets all Reservation Request Forms
 * @method GET /
 * @returns {Promise<IReservationRequestSchema[] | null>} list of all Reservation Request Forms
 * @throws {ErrorHandler} if error occurs while getting Reservation Request Forms
 */
router.get(
  "/",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.getReservationRequestForm
);

router.put(
  "/:id",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.updateStatusforReservationRequestForm
);

/**
 * Deletes a Reservation Request Form
 * @method DELETE /:id
 * @param {string} request.params.id - id of the Reservation Request Form to be deleted
 * @returns {Promise<IReservationRequestSchema | null>} deleted Reservation Request Form
 * @throws {ErrorHandler} if error occurs while deleting Reservation Request Form
 */
router.delete(
  "/:id",
  AuthMiddleware.authenticate,
  ReservationRequestFormController.deleteReservationRequestForm
);

/**
 * @export {Router} router
 */
export default router;
