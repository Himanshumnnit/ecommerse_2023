import express from "express";
import JWT from "jsonwebtoken";
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

//routing
//register
router.post("/register", registerController);

//forget password
router.post("/forgot-password", forgotPasswordController);

//login
router.post("/login", loginController);

//test
router.get("/test", requireSignIn, isAdmin, testController);

//user protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//admin protected route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
