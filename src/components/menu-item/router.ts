/**
 * MenuItem Router
 * @module src/components/menu-item/router
 * @description Handles menu item related requests
 */
import { Router } from "express";
import MenuItemController from "./controller";
import AuthMiddleware from "../../config/middleware/auth";
import { uploadToCloudinary } from "../../config/cloudinary/uploadMiddleware";

const router = Router();

router.post(
  "/",
  AuthMiddleware.authenticate,
  uploadToCloudinary,
  MenuItemController.createMenuItem
);

router.get("/", MenuItemController.getAllMenuItems);

router.get("/:id", MenuItemController.getMenuItemById);

router.patch(
  "/:id",
  AuthMiddleware.authenticate,
  uploadToCloudinary,
  MenuItemController.updateMenuItem
);

router.delete(
  "/:id",
  AuthMiddleware.authenticate,
  MenuItemController.deleteMenuItem
);

export default router;
