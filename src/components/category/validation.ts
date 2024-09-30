import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";

/**
 * Validation class for category-related data using Joi.
 * Provides methods to validate category creation and update data, as well as MongoDB ObjectIDs.
 */
class CategoryValidation {
  /**
   * Schema for validating the request body when creating a category.
   * @type {Joi.ObjectSchema}
   */
  public createCategoryBody: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.empty": "Name cannot be empty",
    }),
    description: Joi.string().optional(),
  });

  /**
   * Schema for validating the request body when updating a category.
   * @type {Joi.ObjectSchema}
   */
  public updateCategoryBody: Joi.ObjectSchema = Joi.object({
    name: Joi.string().optional().messages({
      "string.empty": "Name cannot be empty",
    }),
    description: Joi.string().optional(),
  });

  /**
   * Validates a MongoDB ObjectID.
   * @param {string} id - The ID to validate.
   * @returns {Joi.ValidationResult} - The result of the validation.
   * @throws {Joi.ValidationError} - Throws an error if the ID format is invalid.
   */
  public validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }
}

export default CategoryValidation;
