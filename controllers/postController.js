import Post from "../models/postModel.js";

// Create post
export const createPost = async (req, res) => {
  try {
    const post = req.body;

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
