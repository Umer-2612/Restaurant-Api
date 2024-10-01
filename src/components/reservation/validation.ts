import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

export default class ReservationRequestsValidation {
  static reservationRequestsValidation: any;

  public validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }

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
    date_of_reservation: Joi.date().required().messages({
      "any.required": "Date of reservation is required",
      "string.empty": "Date of reservation cannot be empty",
    }),
    message: Joi.string().required().messages({
      "any.required": "Message is required",
      "string.empty": "Message cannot be empty",
    }),
    recordDeleted: Joi.boolean().optional().default(false),
  });

  public validateUpdateReservationRequestForm: Joi.ObjectSchema = Joi.object({
    firstName: Joi.string().optional().default(null),
    lastName: Joi.string().optional().default(null),
    phoneNo: Joi.number().optional().default(null),
    email: Joi.string().optional().default(null),
    noOfPeople: Joi.number().optional().default(0),
    date_of_reservation: Joi.date().optional().default(null),
    message: Joi.string().optional().default(null),
    recordDeleted: Joi.boolean().optional().default(false),
  });
}
