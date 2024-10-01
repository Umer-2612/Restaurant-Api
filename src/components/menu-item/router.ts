import { Router } from "express";
import MenuItemController from "./controller";

// Create a new router instance
const router = Router();

router.post("/", MenuItemController.createMenuItem);
router.get("/", MenuItemController.getMenuItems);
router.get("/:id", MenuItemController.getMenuItemById);
router.patch("/:id", MenuItemController.updateMenuItem);
router.delete("/:id", MenuItemController.deleteMenuItem);

export default router;
