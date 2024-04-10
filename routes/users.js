import express from "express";
import {
  signupUser,
  loginUser,
  getUser,
  updateUser,
  changePassword,
  changeEmail,
} from "../controllers/userController.js";
import { authRequest } from "../middleware/authRequest.js";

const router = express.Router();

// Signup user
router.post("/signup", signupUser);

// Login user
router.post("/login", loginUser);

// Auth check
router.use(authRequest);

// Get user
router.get("/", getUser);

// Update user
router.put("/updateUser/:id", updateUser);

// Change user password
router.put("/changePassword/:id", changePassword);

// Change user email
router.put("/changeEmail/:id", changeEmail);

export default router;
