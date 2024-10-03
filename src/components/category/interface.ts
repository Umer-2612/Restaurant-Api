import mongoose from "mongoose";

/**
 * @interface ICategorySchema
 * @extends Document
 * @description Interface representing the category schema in the database.
 */
export interface ICategorySchema extends Document {
  /**
   * @property {string} name - The name of the category.
   * @description The name of the category.
   */
  name: string;

  /**
   * @property {string} [description] - A brief description of the category (optional).
   */
  description?: string;

  /**
   * @property {boolean} recordDeleted - Indicates if the category has been soft deleted.
   */
  recordDeleted: boolean;

  /**
   * @property {mongoose.Schema.Types.ObjectId} createdBy - The ID of the user who created the category.
   */
  createdBy: mongoose.Schema.Types.ObjectId;

  /**
   * @property {mongoose.Schema.Types.ObjectId} updatedBy - The ID of the user who last updated the category.
   */
  updatedBy: mongoose.Schema.Types.ObjectId;

  /**
   * @property {Date} createdAt - The date when the category was created.
   */
  createdAt: Date;

  /**
   * @property {Date} updatedAt - The date when the category was last updated.
   */
  updatedAt: Date;
}

/**
 * Interface representing the pagination query object.
 *
 * @interface IPaginationBody
 * @property {number} page - The page number to retrieve.
 * @property {number} limit - The number of records to retrieve per page.
 */
export interface IPaginationBody {
  page: number;
  limit: number;
}

/**
 * @interface ICategoryService
 * @description Interface defining the category service methods for managing categories.
 */
export interface ICategoryService {
  /**
   * @method createCategory
   * @param {ICategorySchema} data - The category data to create.
   * @returns {Promise<ICategorySchema>} The created category.
   */
  createCategory(data: ICategorySchema): Promise<ICategorySchema>;

  /**
   * @method getCategories
   * @returns {Promise<{data : ICategorySchema[], totalCount: number}>} A list of all categories.
   */
  getCategories(data: IPaginationBody): Promise<{ data: ICategorySchema[], totalCount: number }>;

  /**
   * @method getCategoryById
   * @param {string} id - The ID of the category to retrieve.
   * @returns {Promise<ICategorySchema>} The retrieved category.
   */
  getCategoryById(id: string): Promise<ICategorySchema>;

  /**
   * @method updateCategory
   * @param {string} id - The ID of the category to update.
   * @param {Partial<ICategorySchema>} data - The updated category data.
   * @returns {Promise<ICategorySchema>} The updated category.
   */
  updateCategory(
    id: string,
    data: Partial<ICategorySchema>
  ): Promise<ICategorySchema>;

  /**
   * @method deleteCategory
   * @param {string} id - The ID of the category to delete.
   * @returns {Promise<void>} A promise indicating the deletion status.
   */
  deleteCategory(id: string): Promise<void>;
}
