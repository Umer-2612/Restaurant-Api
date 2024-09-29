import { Response, Router } from "express";
import AuthController from "./controller";

var passport = require("passport");

const router = Router();

router.post("/sign-up", AuthController.signUp);

router.post("/sign-in", AuthController.signIn);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  AuthController.googleCallback
);
export default router;
