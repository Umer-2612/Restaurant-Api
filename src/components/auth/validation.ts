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

  public static signOutBody = Joi.object({
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
      "string.email": "Please provide a valid email address",
    }),
  });

  public static updateProfileBody = Joi.object({
    userName: Joi.string().required().messages({
      "any.required": "User Name is required",
      "string.empty": "User Name cannot be empty",
    }),
  });

  public static changePasswordBody = Joi.object({
    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
    }),
    newPassword: Joi.string().required().messages({
      "any.required": "New Password is required",
      "string.empty": "New Password cannot be empty",
    }),
    confirmPassword: Joi.string().required().messages({
      "any.required": "Confirm Password is required",
      "string.empty": "Confirm Password cannot be empty",
    }),
  });

  public static forgotPasswordBody = Joi.object({
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
      "string.email": "Please provide a valid email address",
    }),
  });

  public static resetPasswordBody = Joi.object({
    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
    }),
    confirmPassword: Joi.string().required().messages({
      "any.required": "Confirm Password is required",
      "string.empty": "Confirm Password cannot be empty",
    }),
    encryptedEmail: Joi.string().required().messages({
      "any.required": "Encrypted Email is required",
      "string.empty": "Encrypted Email cannot be empty",
    }),
    otp: Joi.number().required().messages({
      "any.required": "OTP is required",
      "string.empty": "OTP cannot be empty",
    })
  });

  public static validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  };
}
