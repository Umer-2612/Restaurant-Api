import { Router } from "express";
import MenuController from "./controller";

const router = Router();

router.post("/createCategory", MenuController.createCategory);
router.patch("/updateCategory/:id", MenuController.updateCategory);
router.get("/getCategories", MenuController.getCategories);
router.delete("/deleteCategory/:id", MenuController.deleteCategory);

router.post("/createMenuItem", MenuController.createMenuItem);
router.patch("/updateMenuItem/:id", MenuController.updateMenuItem);
router.get("/getMenuItems", MenuController.getMenuItems);
router.delete("/deleteMenuItem/:id", MenuController.deleteMenuItem);


export default router;
