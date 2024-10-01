/**
 * Contact Request Form Router
 * @module src/components/contact_us/router
 * @description Handles contact request form related requests
 */
import { Router } from "express";
import ContactRequestFormController from "./controller";

/**
 * Express Router for handling contact request form related requests
 * @constant {Router} router
 */
const router = Router();

/**
 * Creates a new Contact Request Form
 * @method POST /
 * @param {IContactRequestSchema} request.body - contact request form data
 * @returns {Promise<IContactRequestSchema>} newly created contact request form
 * @throws {ErrorHandler} if error occurs while creating contact request form
 */
router.post("/", ContactRequestFormController.createContactRequestForm);

/**
 * Updates an existing Contact Request Form
 * @method PATCH /:id
 * @param {string} request.params.id - id of the contact request form to be updated
 * @param {IContactRequestSchema} request.body - contact request form data
 * @returns {Promise<IContactRequestSchema | null>} updated contact request form
 * @throws {ErrorHandler} if error occurs while updating contact request form
 */
router.patch("/:id", ContactRequestFormController.updateContactRequestForm);

/**
 * Gets all Contact Request Forms
 * @method GET /
 * @returns {Promise<IContactRequestSchema[] | null>} list of all contact request forms
 * @throws {ErrorHandler} if error occurs while getting contact request forms
 */
router.get("/", ContactRequestFormController.getContactRequestForm);

/**
 * Deletes a Contact Request Form
 * @method DELETE /:id
 * @param {string} request.params.id - id of the contact request form to be deleted
 * @returns {Promise<IContactRequestSchema | null>} deleted contact request form
 * @throws {ErrorHandler} if error occurs while deleting contact request form
 */
router.delete("/:id", ContactRequestFormController.deleteContactRequestForm);

/**
 * @export {Router} router
 */

export default router;