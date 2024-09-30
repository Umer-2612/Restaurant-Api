// controller.ts

import { Request, Response } from "express";
import CategoryService from "./service";
import Generator from "../../utils/generator";
import { ErrorHandler } from "../../utils/common-function";
import CategoryValidation from "./validation";

/**
 * @class CategoryController
 * @description Controller for handling category-related requests.
 */
class CategoryController {
  private categoryService: CategoryService;
  private categoryValidation: CategoryValidation;

  constructor() {
    this.handleError = this.handleError.bind(this);
    this.categoryService = new CategoryService();
    this.categoryValidation = new CategoryValidation();
  }

  /**
   * @private
   * @method handleError
   * @param {Response} res - The response object from Express.
   * @param {any} error - The error object.
   * @returns {Promise<any>}
   * @description Handles errors and sends an appropriate response.
   */
  private async handleError(res: Response, error: any): Promise<any> {
    const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
    const message =
      error instanceof ErrorHandler ? error.message : "Internal Server Error";

    // Send the error response using res object directly
    Generator.sendResponse({ res, statusCode, success: false, message });
  }

  /**
   * @public
   * @method createCategory
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Creates a new category based on the request body.
   */
  public createCategory = async (req: Request, res: Response): Promise<any> => {
    try {
      // Validate the request body using the validation schema
      const { error } = this.categoryValidation.createCategoryBody.validate(
        req.body
      );

      if (error) {
        // If validation fails, return the error response
        return Generator.sendResponse({
          res,
          statusCode: 400,
          success: false,
          message: error.details[0].message, // Get the first validation error message
        });
      }

      const categoryData = req.body;

      const category = await this.categoryService.createCategory(categoryData);
      return Generator.sendResponse({
        res,
        statusCode: 201,
        message: "Category created successfully",
        data: category,
      });
    } catch (error: any) {
      console.log({ error });
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method getCategories
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Retrieves all categories.
   */
  public getCategories = async (req: Request, res: Response): Promise<any> => {
    try {
      const categories = await this.categoryService.getCategories();
      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Categories retrieved successfully",
        data: categories,
      });
    } catch (error: any) {
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method getCategoryById
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Retrieves a category by its ID.
   */
  public getCategoryById = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const idValidation = this.categoryValidation.validateId(id); // Validate ID

      if (idValidation.error) {
        return Generator.sendResponse({
          res,
          statusCode: 400,
          success: false,
          message: idValidation.error.details[0].message,
        });
      }
      const category = await this.categoryService.getCategoryById(id);
      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Category retrieved successfully",
        data: category,
      });
    } catch (error: any) {
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method updateCategory
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Updates an existing category by its ID.
   */
  public updateCategory = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const idValidation = this.categoryValidation.validateId(id); // Validate ID

      if (idValidation.error) {
        return Generator.sendResponse({
          res,
          statusCode: 400,
          success: false,
          message: idValidation.error.details[0].message,
        });
      }

      const bodyValidation =
        this.categoryValidation.updateCategoryBody.validate(req.body);

      if (bodyValidation.error) {
        return Generator.sendResponse({
          res,
          statusCode: 400,
          success: false,
          message: bodyValidation.error.details[0].message,
        });
      }

      const updatedCategory = await this.categoryService.updateCategory(
        id,
        req.body
      );
      return Generator.sendResponse({
        res,
        statusCode: 200,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error: any) {
      await this.handleError(res, error);
    }
  };

  /**
   * @public
   * @method  deleteCategory
   * @param {Request} req - The request object from Express.
   * @param {Response} res - The response object from Express.
   * @returns {Promise<any>}
   * @description Deletes a category by its ID.
   */
  public deleteCategory = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const idValidation = this.categoryValidation.validateId(id); // Validate ID

      if (idValidation.error) {
        return Generator.sendResponse({
          res,
          statusCode: 400,
          success: false,
          message: idValidation.error.details[0].message,
        });
      }

      await this.categoryService.deleteCategory(id);

      return Generator.sendResponse({
        res,
        statusCode: 200, // No content
        message: "Category deleted successfully",
      });
    } catch (error: any) {
      await this.handleError(res, error);
    }
  };
}

export default new CategoryController();
