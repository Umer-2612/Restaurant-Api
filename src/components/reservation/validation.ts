/**
 * Validation class for reservation-related data using Joi.
 *
 * @class ReservationRequestsValidation
 * @constructor
 */
import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

export default class ReservationRequestsValidation {
  static reservationRequestsValidation: any;

  /**
   * Validates a MongoDB ObjectID.
   *
   * @param {string} id - The ID to validate.
   * @returns {Joi.ValidationResult} - The result of the validation.
   * @throws {Joi.ValidationError} - Throws an error if the ID format is invalid.
   */
  public validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }

  /**
   * Validates a reservation request object when creating a new reservation request.
   *
   * @type {Joi.ObjectSchema}
   */
  public validateCreateReservationRequestForm: Joi.ObjectSchema = Joi.object({
    firstName: Joi.string().required().messages({
      "any.required": "First name is required",
      "string.empty": "First name cannot be empty",
    }),
    lastName: Joi.string().required().messages({
      "any.required": "Last name is required",
      "string.empty": "Last name cannot be empty",
    }),
    phoneNo: Joi.number().required().messages({
      "any.required": "Phone number is required",
      "string.empty": "Phone number cannot be empty",
    }),
    email: Joi.string().required().messages({
      "any.required": "email is required",
      "string.empty": "email cannot be empty",
    }),
    noOfPeople: Joi.number().required().messages({
      "any.required": "No of people is required",
      "string.empty": "No of people cannot be empty",
    }),
    reservationDate: Joi.date()
      .required()
      .greater("now") // This ensures the reservationDate is in the future
      .messages({
        "any.required": "Date of reservation is required",
        "string.empty": "Date of reservation cannot be empty",
        "date.greater": "Reservation date must be a future date",
      }),
    message: Joi.string().required().messages({
      "any.required": "Message is required",
      "string.empty": "Message cannot be empty",
    }),
    recordDeleted: Joi.boolean().optional().default(false),
  });

  /**
   * Validates a reservation request object when updating an existing reservation request.
   *
   * @type {Joi.ObjectSchema}
   */
  public validateUpdateReservationRequestForm: Joi.ObjectSchema = Joi.object({
    firstName: Joi.string().optional().default(null),
    lastName: Joi.string().optional().default(null),
    phoneNo: Joi.number().optional().default(null),
    email: Joi.string().optional().default(null),
    status: Joi.string().optional().default(null),
    noOfPeople: Joi.number().optional().default(0),
    reservationDate: Joi.date().optional().default(null),
    message: Joi.string().optional().default(null),
    recordDeleted: Joi.boolean().optional().default(false),
  });

  /**
   * Validates a pagination query object.
   *
   * @param {Object} body - The pagination query object to validate.
   * @returns {Joi.ValidationResult} - The result of the validation.
   */
  public validatePaginationBody(body: any): Joi.ValidationResult {
    return Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().optional(),
    }).validate(body);
  }
}
