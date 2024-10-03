/**
 * MenuItem Router
 * @module src/components/menu-item/router
 * @description Handles menu item related requests
 */
import { Router } from "express";
import MenuItemController from "./controller";

/**
 * Express Router for handling menu item related requests
 * @constant {Router} router
 */
// Create a new router instance
const router = Router();

/**
 * Creates a new menu item
 * @method POST /
 * @param {IMenuItemSchema} request.body - menu item data
 * @returns {Promise<IMenuItemSchema>} newly created menu item
 * @throws {ErrorHandler} if error occurs while creating menu item
 */
router.post("/", MenuItemController.createMenuItem);

/**
 * Gets all menu items
 * @method GET /
 * @returns {Promise<IMenuItemSchema[] | null>} list of all menu items
 * @throws {ErrorHandler} if error occurs while getting menu items
 */
router.get("/", MenuItemController.getAllMenuItems);

/**
 * Gets a menu item by id
 * @method GET /:id
 * @param {string} request.params.id - id of the menu item to be retrieved
 * @returns {Promise<IMenuItemSchema | null>} menu item
 * @throws {ErrorHandler} if error occurs while getting menu item
 */
router.get("/:id", MenuItemController.getMenuItemById);

// /**
//  * Gets all menu items for a specific category
//  * @method GET /category/:categoryId
//  * @param {string} request.params.categoryId - id of the category
//  * @returns {Promise<IMenuItemSchema[] | null>} list of menu items
//  * @throws {ErrorHandler} if error occurs while getting menu items
//  */
// router.get("/category/:categoryId", MenuItemController.getMenuItemByCategory);

/**
 * Updates an existing menu item
 * @method PATCH /:id
 * @param {string} request.params.id - id of the menu item to be updated
 * @param {IMenuItemSchema} request.body - menu item data
 * @returns {Promise<IMenuItemSchema | null>} updated menu item
 * @throws {ErrorHandler} if error occurs while updating menu item
 */
router.patch("/:id", MenuItemController.updateMenuItem);

/**
 * Deletes a menu item
 * @method DELETE /:id
 * @param {string} request.params.id - id of the menu item to be deleted
 * @returns {Promise<IMenuItemSchema | null>} deleted menu item
 * @throws {ErrorHandler} if error occurs while deleting menu item
 */
router.delete("/:id", MenuItemController.deleteMenuItem);

export default router;
