import express from "express";
import {
  signupUser,
  loginUser,
  getUser,
  changePassword,
  changeEmail,
  changeUsername,
  changeBirthdate,
  changeDescription,
  changeAvatar,
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

// Change user password
router.put("/changePassword/:id", changePassword);

// Change user email
router.put("/changeEmail/:id", changeEmail);

// Change user name
router.put("/changeUsername/:id", changeUsername);

// Change user birth date
router.put("/changeBirthdate/:id", changeBirthdate);

// Change user description
router.put("/changeDescription/:id", changeDescription);

// Change user avatar
router.put("/changeAvatar/:id", changeAvatar);

export default router;
