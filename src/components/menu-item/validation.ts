import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

class MenuItemValidation {
  /**
   * Schema for validating the request body when creating a menu item.
   * @type {Joi.ObjectSchema}
   */
  public createMenuItemBody: Joi.ObjectSchema = Joi.object({
    itemName: Joi.string().required().messages({
      "any.required": "Item name is required",
      "string.empty": "Item name cannot be empty",
    }),
    // will get back to this validation of ID
    category: Joi.string().required().messages({
      "any.required": "Category is required",
    }),
    itemDescription: Joi.string().optional(),
    itemPrice: Joi.number().required().messages({
      "any.required": "Item price is required",
      "number.base": "Item price must be a number",
    }),
  });

  public updateMenuItemBody: Joi.ObjectSchema = Joi.object({
    itemName: Joi.string().optional(),
    category: Joi.string().optional(),
    itemDescription: Joi.string().optional(),
    itemPrice: Joi.number().optional(),
  });

  public validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }
}

export default MenuItemValidation;
