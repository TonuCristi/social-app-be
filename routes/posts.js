import express from "express";
import Post from "../models/postModel.js";

const router = express.Router();

// GET all posts
router.get("/", (req, res) => {
  res.json({ msg: "GET all posts!" });
});

// POST a new post
router.post("/", async (req, res) => {
  const { description, image, user_id } = req.body;

  try {
    const post = await Post.create({ description, image, user_id });

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
