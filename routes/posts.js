import express from "express";
import { authRequest } from "../middleware/authRequest.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePostImage,
  updatePostDescription,
} from "../controllers/postController.js";

const router = express.Router();

// Auth check
router.use(authRequest);

// Create post
router.post("/post/createPost", createPost);

// Get a post
router.get("/post/:id", getPost);

// Get all posts
router.get("/:userId", getPosts);

// Delete post
router.delete("/post/deletePost/:id", deletePost);

// Update post description
router.put("/post/updateDescription/:id", updatePostDescription);

// Update post image
router.put("/post/updateImage/:id", updatePostImage);

export default router;
