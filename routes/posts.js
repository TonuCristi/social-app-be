import express from "express";
import { authRequest } from "../middleware/authRequest.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePostImage,
  updatePostDescription,
  likePost,
  getLikes,
  unlikePost,
  addComment,
  deleteComment,
  editComment,
  getComments,
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

// Like a post
router.post("/post/like/:id", likePost);

// Unlike a post
router.post("/post/unlike/:id", unlikePost);

// Get post likes
router.get("/post/likes/:id", getLikes);

// Add comment to a post
router.post("/post/comment/:id", addComment);

// Delete a comment from a post
router.post("/post/deleteComment/:id", deleteComment);

// Edit a comment from a post
router.put("/post/comments/:id", editComment);

// Get post comments
router.get("/post/comments/:id", getComments);

export default router;
