import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

export default class ContactRequestsValidation {
  public validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }

  public validateCreateContactRequestForm = Joi.object({
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
    message: Joi.string().required().messages({
      "any.required": "Message is required",
      "string.empty": "Message cannot be empty",
    }),
    recordDeleted: Joi.boolean().optional().default(false),
  });

  public validateUpdateContactRequestForm = Joi.object({
    firstName: Joi.string().optional().default(null),
    lastName: Joi.string().optional().default(null),
    phoneNo: Joi.number().optional().default(null),
    email: Joi.string().optional().default(null),
    message: Joi.string().optional().default(null),
    recordDeleted: Joi.boolean().optional().default(false),
  });

  public validatePaginationBody(body: any): Joi.ValidationResult {
    return Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().optional(),
    }).validate(body);
  }
}
