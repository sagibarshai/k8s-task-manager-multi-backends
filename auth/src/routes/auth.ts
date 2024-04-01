import { Router } from "express";
import { body } from "express-validator";
import { loginController, signupController } from "../controllers/auth";

const router = Router();

// Signup
router.post(
  "/signup",
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").isLength({ min: 6, max: 20 }).withMessage("Password must have 6 - 20 characters"),
  signupController
);
//

// Login
router.post(
  "/login",
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").isLength({ min: 6, max: 20 }).withMessage("Password must have 6 - 20 characters"),
  loginController
);
//

export { router as authRouter };
