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
  MenuItemController.create
);

router.get("/", MenuItemController.getAll);

router.get("/:id", MenuItemController.getOne);

router.patch(
  "/:id",
  // AuthMiddleware.authenticate,
  uploadToCloudinary,
  MenuItemController.update
);

router.delete("/:id", AuthMiddleware.authenticate, MenuItemController.delete);

export default router;
