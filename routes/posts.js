import express from "express";
import { authRequest } from "../middleware/authRequest.js";
import {
  createPost,
  getPost,
  getPosts,
} from "../controllers/postController.js";

const router = express.Router();

// Auth check
router.use(authRequest);

// Create post
router.post("/createPost", createPost);

// Get a post
router.get("/post/:id", getPost);

// Get all posts
// router.get("/:userId", getPosts);

export default router;
