import { Router } from "express";
import AuthMiddleware from "../../config/middleware/auth";
import ProblemSetController from "./controller";

const router = Router();

router.get("/", AuthMiddleware.authenticate, ProblemSetController.getAll);

router.put("/:id", AuthMiddleware.authenticate, ProblemSetController.update);

router.post("/", AuthMiddleware.authenticate, ProblemSetController.create);

router.delete("/:id", AuthMiddleware.authenticate, ProblemSetController.delete);

export default router;
