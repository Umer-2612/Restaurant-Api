import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

export default class ContactRequestsValidation {

  public static validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }

  public static validateCreateContactRequestForm = Joi.object({
    first_name: Joi.string().required().messages({
      "any.required": "First name is required",
      "string.empty": "First name cannot be empty",
    }),
    last_name: Joi.string().required().messages({
      "any.required": "Last name is required",
      "string.empty": "Last name cannot be empty",
    }),
    phone_no: Joi.number().required().messages({
      "any.required": "Phone number is required",
      "string.empty": "Phone number cannot be empty",
    }),
    email: Joi.string().required().messages({
      "any.required": "email is required",
      "string.empty": "email cannot be empty",
    }),
    message: Joi.string().required().messages({
      "any.required": "Message is required",
      "string.empty": "Message cannot be empty",
    }),
    is_deleted: Joi.boolean().optional().default(false),
  });

  public static validateUpdateContactRequestForm = Joi.object({
    first_name: Joi.string().optional().default(null),
    last_name: Joi.string().optional().default(null),
    phone_no: Joi.number().optional().default(null),
    email: Joi.string().optional().default(null),
    message: Joi.string().optional().default(null),
    is_deleted: Joi.boolean().optional().default(false),
  });
}
