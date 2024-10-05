/**
 * Class that provides methods for validating menu item-related data using Joi.
 *
 * @class MenuItemValidation
 * @author Neel Rana
 * @since 2024-10-01
 */
import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

/**
 * Schema for validating the request body when creating a menu item.
 * @type {Joi.ObjectSchema}
 */
export class MenuItemValidation {
  /**
   * Schema for validating the request body when creating a menu item.
   * @type {Joi.ObjectSchema}
   */
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

  /**
   * Schema for validating the request body when updating a menu item.
   * @type {Joi.ObjectSchema}
   */
  public updateMenuItemBody: Joi.ObjectSchema = Joi.object({
    /**
     * Item name
     * @type {Joi.StringSchema}
     */
    itemName: Joi.string().optional(),
    /**
     * Category ID
     * @type {Joi.StringSchema}
     */
    category: Joi.string().optional(),
    /**
     * Item description
     * @type {Joi.StringSchema}
     */
    itemDescription: Joi.string().optional(),
    /**
     * Item price
     * @type {Joi.NumberSchema}
     */
    itemPrice: Joi.number().optional(),
  });

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
   * Validates a pagination query object.
   *
   * @param {Object} body - The pagination query object to validate.
   * @returns {Joi.ValidationResult} - The result of the validation.
   */
  public validatePaginationBody(body: any): Joi.ValidationResult {
    return Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().optional(),
      category: Joi.string().optional(),
    }).validate(body);
  }
}

export default MenuItemValidation;
