import { Router } from "express";
import CategoryController from "./controller";

// Create a new router instance
const router = Router();

/**
 * @route POST /
 * @group Categories - Operations about categories
 * @param {object} request.body - Category data to be created
 * @returns {object} 201 - Category created successfully
 * @returns {Error} 400 - Invalid input data
 * @returns {Error} 500 - Internal server error
 * @description Create a new category.
 */
router.post("/", CategoryController.createCategory);

/**
 * @route GET /
 * @group Categories - Operations about categories
 * @returns {Array.<object>} 200 - A list of categories
 * @returns {Error} 500 - Internal server error
 * @description Retrieve all categories.
 */
router.get("/", CategoryController.getCategories);

/**
 * @route GET /:id
 * @group Categories - Operations about categories
 * @param {string} id.path.required - The ID of the category to retrieve
 * @returns {object} 200 - A category object
 * @returns {Error} 400 - Invalid category ID format
 * @returns {Error} 404 - Category not found
 * @returns {Error} 500 - Internal server error
 * @description Retrieve a category by its ID.
 */
router.get("/:id", CategoryController.getCategoryById);

/**
 * @route PUT /:id
 * @group Categories - Operations about categories
 * @param {string} id.path.required - The ID of the category to update
 * @param {object} request.body - Updated category data
 * @returns {object} 200 - Category updated successfully
 * @returns {Error} 400 - Invalid input data
 * @returns {Error} 404 - Category not found
 * @returns {Error} 500 - Internal server error
 * @description Update a category by its ID.
 */
router.put("/:id", CategoryController.updateCategory);

/**
 * @route DELETE /:id
 * @group Categories - Operations about categories
 * @param {string} id.path.required - The ID of the category to delete
 * @returns {object} 204 - Category deleted successfully
 * @returns {Error} 400 - Invalid category ID format
 * @returns {Error} 404 - Category not found
 * @returns {Error} 500 - Internal server error
 * @description Delete a category by its ID.
 */
router.delete("/:id", CategoryController.deleteCategory);

export default router;
