import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

export default class MenuValidation {

  public static validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }

  public static validateCreateCategory = Joi.object({
    category_name: Joi.string().required().messages({
      "any.required": "Category name is required",
      "string.empty": "Category name cannot be empty",
    }),
    category_description: Joi.string().optional().default(null),
    is_enabled: Joi.boolean().optional().default(true),
    is_deleted: Joi.boolean().optional().default(false),
    created_by: Joi.string().optional().default("admin"),
    updated_by: Joi.string().optional().default("admin"),
  });

  public static validateUpdateCategory = Joi.object({
    category_name: Joi.string().optional().default(null),
    category_description: Joi.string().optional().default(null),
    is_enabled: Joi.boolean().optional().default(true),
    is_deleted: Joi.boolean().optional().default(false),
    created_by: Joi.string().optional().default("admin"),
    updated_by: Joi.string().optional().default("admin"),
  });

  public static validateCreateMenuItem = Joi.object({
    item_name: Joi.string().required().messages({
      "any.required": "Item name is required",
      "string.empty": "Item name cannot be empty",
    }),
    catgory_id: Joi.string().required().messages({
      "any.required": "Category id is required",
      "string.empty": "Category id cannot be empty",
    }),
    item_description: Joi.string().optional().default(null),
    item_price: Joi.number().required().messages({
      "any.required": "Item price is required",
      "number.empty": "Item price cannot be empty",
    }),
    is_enabled: Joi.boolean().optional().default(true),
    is_deleted: Joi.boolean().optional().default(false),
    created_by: Joi.string().optional().default("admin"),
    updated_by: Joi.string().optional().default("admin"),
  });

  public static validateUpdateMenuItem = Joi.object({
    item_name: Joi.string().optional().default(null),
    catgory_id: Joi.string().required().messages({
      "any.required": "Category id is required",
      "string.empty": "Category id cannot be empty",
    }),
    item_description: Joi.string().optional().default(null),
    item_price: Joi.number().optional().default(null),
    is_enabled: Joi.boolean().optional().default(true),
    is_deleted: Joi.boolean().optional().default(false),
    created_by: Joi.string().optional().default("admin"),
    updated_by: Joi.string().optional().default("admin"),
  });
}
