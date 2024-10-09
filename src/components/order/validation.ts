import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

export default class OrderValidation {
  static orderValidation: any;

  public validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }

  public validateCreateOrder: Joi.ObjectSchema = Joi.object({
    items: Joi.array().required().messages({
      "any.required": "Items is required",
      "string.empty": "Items cannot be empty",
    }),
    totalPrice: Joi.number().required().messages({
      "any.required": "Total price is required",
      "string.empty": "Total price cannot be empty",
    }),
    orderDate: Joi.date().required().messages({
      "any.required": "Date is required",
      "string.empty": "Date cannot be empty",
    }),
    orderdName: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.empty": "Name cannot be empty",
    }),
    orderdEmail: Joi.string().required().messages({
      "any.required": "email is required",
      "string.empty": "email cannot be empty",
    }),
    paymentMethod: Joi.string().required().messages({
      "any.required": "Payment method is required",
      "string.empty": "Payment method cannot be empty",
    }),
    status: Joi.string().optional().default("Pending"),
    paymentStatus: Joi.string().optional().default("Pending"),
    recordDeleted: Joi.boolean().optional().default(false),
  });

  public validatePaginationBody(body: any): Joi.ValidationResult {
    return Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().optional(),
    }).validate(body);
  }
}
