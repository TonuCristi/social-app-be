import Post from "../models/postModel.js";
import Like from "../models/likeModel.js";

// Create post
export const createPost = async (req, res) => {
  try {
    const { description, image, ...rest } = req.body;

    if (!description) throw new Error("You should write a description!");

    const post = await Post.create({ description, image, ...rest });

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// Get post
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) throw new Error("Post not found!");

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const { perPage, offset } = req.query;

    const posts = await Post.find({ user_id: userId });

    if (!posts) throw new Error("Posts not found!");

    if (offset >= posts.length) return res.status(200).json([]);

    const result = posts.reverse().slice(+offset, +offset + +perPage);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// Update post description
export const updatePostDescription = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.findByIdAndUpdate(id, {
      description: req.body.description,
    });

    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// Update post image
export const updatePostImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const post = await Post.findByIdAndUpdate(id, { image });

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// Like post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    await Like.create({ user_id, post_id: id });

    const likes = await Like.find({ post_id: id });

    res.status(200).json(likes);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// Get post likes
export const getLikes = async (req, res) => {
  try {
    const { id } = req.params;

    const likes = await Like.find({ post_id: id });

    res.status(200).json(likes);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Cannot get likes!" });
  }
};
