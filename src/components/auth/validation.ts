import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

export default class AuthValidation {
  public static signInBody = Joi.object({
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
      "string.email": "Please provide a valid email address",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
    }),
  });

  public static validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }
}
