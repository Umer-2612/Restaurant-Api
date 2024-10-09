import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

export class MenuItemValidation {
  public createMenuItemBody: Joi.ObjectSchema = Joi.object({
    itemName: Joi.string().required().messages({
      "any.required": "Item name is required",
      "string.empty": "Item name cannot be empty",
    }),
    category: Joi.string().required().messages({
      "any.required": "Category is required",
    }),
    itemDescription: Joi.string().optional(),
    itemPrice: Joi.number().required().messages({
      "any.required": "Item price is required",
      "number.base": "Item price must be a number",
    }),
    filePath: Joi.string().optional(),
  });

  public updateMenuItemBody: Joi.ObjectSchema = Joi.object({
    itemName: Joi.string().optional(),
    category: Joi.string().optional(),
    itemDescription: Joi.string().optional(),
    itemPrice: Joi.number().optional(),
    filePath: Joi.string().optional(),
  });

  public validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }

  public validatePaginationBody(body: any): Joi.ValidationResult {
    return Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().optional(),
      category: Joi.string().optional(),
    }).validate(body);
  }
}

export default MenuItemValidation;
