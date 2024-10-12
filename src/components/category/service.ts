import {
  ICategoryService,
  ICategorySchema,
  IPaginationBody,
} from "./interface";
import CategoryDAO from "./dao";
import { ErrorHandler } from "../../utils/common-function";

/**
 * Service class for handling category-related operations.
 * Implements ICategoryService to provide methods for managing categories.
 */
class CategoryService implements ICategoryService {
  private categoryDao: CategoryDAO;

  constructor() {
    this.categoryDao = new CategoryDAO();
  }

  /**
   * Create a new category.
   * @param {ICategorySchema} data - The category data to be created.
   * @returns {Promise<ICategorySchema>} - The created category.
   * @throws {ErrorHandler} - Throws an error if the category cannot be created.
   */
  async createCategory(data: ICategorySchema): Promise<ICategorySchema> {
    try {
      return await this.categoryDao.createCategory(data);
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to create category",
      });
    }
  }

  /**
   * Retrieve all categories.
   * @returns {Promise<{data : ICategorySchema[], totalCount: number}>} - An array of categories.
   * @throws {ErrorHandler} - Throws an error if the categories cannot be retrieved.
   */
  async getCategories(data: IPaginationBody): Promise<any> {
    try {
      const rowLimit = data.limit ? data.limit : 10;
      const rowSkip = data.page ? (data.page - 1) * rowLimit : 0;
      const matchCondition: any = {
        recordDeleted: false,
      };

      const pipeline = [
        {
          $match: matchCondition,
        },
        {
          $facet: {
            paginationData: [
              { $count: "total" }, // Count the total number of records
              {
                $addFields: {
                  currentPage: data.page > 0 ? Number(data.page) : 1, // Return the current page
                },
              },
            ],
            data: [
              { $sort: { createdAt: -1 } }, // Sort by creation date or any other field
              { $skip: rowSkip }, // Skip the documents for pagination
              { $limit: rowLimit }, // Limit the number of documents returned
              {
                $project: {
                  _id: 1,
                  name: 1,
                  description: 1,
                  createdAt: 1,
                },
              },
            ],
          },
        },
      ];

      const result = await this.categoryDao.getCategories(pipeline);
      return result;
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: 500,
        message: error.message || "Failed to retrieve categories",
      });
    }
  }

  /**
   * Retrieve a category by its ID.
   * @param {string} id - The ID of the category to retrieve.
   * @returns {Promise<ICategorySchema>} - The retrieved category.
   * @throws {ErrorHandler} - Throws an error if the category is not found or cannot be retrieved.
   */
  async getCategoryById(id: string): Promise<ICategorySchema> {
    try {
      const category = await this.categoryDao.getCategoryById(id);
      if (!category) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Category not found",
        });
      }
      return category;
    } catch (error: any) {
      throw error instanceof ErrorHandler
        ? error
        : new ErrorHandler({
            statusCode: 500,
            message: error.message || "Failed to retrieve category",
          });
    }
  }

  /**
   * Update a category by its ID.
   * @param {string} id - The ID of the category to update.
   * @param {Partial<ICategorySchema>} data - The updated category data.
   * @returns {Promise<ICategorySchema>} - The updated category.
   * @throws {ErrorHandler} - Throws an error if the category is not found or cannot be updated.
   */
  async updateCategory(
    id: string,
    data: Partial<ICategorySchema>
  ): Promise<ICategorySchema> {
    try {
      const updatedCategory = await this.categoryDao.updateCategory(id, data);
      if (!updatedCategory) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Category not found for update",
        });
      }
      return updatedCategory;
    } catch (error: any) {
      throw error instanceof ErrorHandler
        ? error
        : new ErrorHandler({
            statusCode: 500,
            message: error.message || "Failed to update category",
          });
    }
  }

  /**
   * Delete a category by its ID.
   * @param {string} id - The ID of the category to delete.
   * @returns {Promise<void>} - A promise that resolves when the category is deleted.
   * @throws {ErrorHandler} - Throws an error if the category cannot be deleted.
   */
  async deleteCategory(id: string): Promise<void> {
    try {
      await this.categoryDao.deleteCategory(id);
    } catch (error: any) {
      throw error instanceof ErrorHandler
        ? error
        : new ErrorHandler({
            statusCode: 500,
            message: error.message || "Failed to delete category",
          });
    }
  }
}

export default CategoryService;
