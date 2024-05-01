import Post from "../models/postModel.js";

// Create post
export const createPost = async (req, res) => {
  try {
    const post = req.body;

    if (!post.description && !post.avatar)
      throw new Error("Complete at least one field!");

    await Post.create(post);

    res.status(200).json({ message: "Post added!" });
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

    const posts = await Post.find({ user_id: userId });

    if (!posts) throw new Error("Posts not found!");

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
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
    const post = req.body;

    await Post.findByIdAndUpdate(id, { description: post.description });

    res.status(200).json({ message: "Post description updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// Update post avatar
export const updatePostAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;

    await Post.findByIdAndUpdate(id, { image: post.avatar });

    res.status(200).json({ message: "Post avatar updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
