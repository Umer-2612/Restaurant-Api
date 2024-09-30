import { Router } from "express";
import MenuItemController from "./controller";

// Create a new router instance
const router = Router();

router.post("/", MenuItemController.createMenuItem);

export default router;
