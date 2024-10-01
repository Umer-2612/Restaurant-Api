import CategorySchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { ICategorySchema, IPaginationBody } from "./interface";

/**
 * @class CategoryDAO
 * @description Data Access Object for interacting with the category database.
 */
export default class CategoryDAO {
  /**
   * @async
   * @method createCategory
   * @param {ICategorySchema} data - The category data to be created.
   * @returns {Promise<ICategorySchema>}
   * @throws {ErrorHandler} Throws an ErrorHandler if the database operation fails.
   * @description Creates a new category in the database.
   */
  async createCategory(data: ICategorySchema): Promise<ICategorySchema> {
    try {
      const res = await CategorySchema.create(data);
      return res;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new ErrorHandler({
          statusCode: 409,
          message: `${field} already exists.`,
        });
      }
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to create category",
      });
    }
  }

  /**
   * @async
   * @method getCategories
   * @returns {Promise<ICategorySchema[]>}
   * @throws {ErrorHandler} Throws an ErrorHandler if the database operation fails.
   * @description Retrieves all categories from the database, excluding deleted records.
   */
  async getCategories(data: IPaginationBody): Promise<ICategorySchema[]> {
    try {
      let rowLimit = data.limit ? data.limit : 10;
      let rowSkip = data.page ? (data.page * rowLimit) - rowLimit : 0;
      return await CategorySchema.find({ recordDeleted: false }).skip(rowSkip).limit(rowLimit); // Fetch only non-deleted records
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve categories",
      });
    }
  }

  /**
   * @async
   * @method getCategoryById
   * @param {string} id - The ID of the category to retrieve.
   * @returns {Promise<ICategorySchema | null>} The retrieved category or null if not found.
   * @throws {ErrorHandler} Throws an ErrorHandler if the database operation fails.
   * @description Retrieves a specific category by its ID from the database.
   */
  async getCategoryById(id: string): Promise<ICategorySchema | null> {
    try {
      return await CategorySchema.findOne({ _id: id, recordDeleted: false });
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to retrieve category",
      });
    }
  }

  /**
   * @async
   * @method updateCategory
   * @param {string} id - The ID of the category to update.
   * @param {Partial<ICategorySchema>} data - The updated category data.
   * @returns {Promise<ICategorySchema | null>} The updated category or null if not found.
   * @throws {ErrorHandler} Throws an ErrorHandler if the database operation fails.
   * @description Updates an existing category in the database by its ID.
   */
  async updateCategory(
    id: string,
    data: Partial<ICategorySchema>
  ): Promise<ICategorySchema | null> {
    try {
      return await CategorySchema.findByIdAndUpdate(id, data, { new: true });
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to update category",
      });
    }
  }

  /**
   * @async
   * @method deleteCategory
   * @param {string} id - The ID of the category to delete.
   * @returns {Promise<any>}
   * @throws {ErrorHandler} Throws an ErrorHandler if the database operation fails.
   * @description Soft deletes a category by marking it as deleted in the database.
   */
  async deleteCategory(id: string): Promise<any> {
    try {
      await CategorySchema.findByIdAndUpdate(id, {
        recordDeleted: true,
      }); // Soft delete
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: "Database Error: Unable to delete category",
      });
    }
  }
}
