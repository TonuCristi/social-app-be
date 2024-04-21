import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Create jwt token
function createJWT(id) {
  const token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: Date.now() - 13 * 24 * 60 * 60 * 1000,
  });

  return token;
}

// Signup user
export const signupUser = async (req, res) => {
  try {
    const user = await User.signup(req.body);

    const token = createJWT(user._id);

    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const user = await User.login(req.body);

    const token = createJWT(user._id);

    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get user
export const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(
      id,
      "_id name email birth_date avatar description createdAt"
    );

    if (!user) throw new Error("User not found!");

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Change user password
export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, newPasswordRepeat } = req.body;

    await User.checkPassword(id, oldPassword, newPassword, newPasswordRepeat);

    res.status(200).json({ message: "Password changed!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Change user email
export const changeEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const user = await User.checkEmail(id, email);

    res.status(200).json({
      user,
      message: "Email changed!",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Change user name
export const changeUsername = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!user) throw new Error("User not found!");

    const { _id, name, email, birth_date, description, avatar, createdAt } =
      user;

    res.status(200).json({
      user: { _id, name, email, birth_date, description, avatar, createdAt },
      message: "Username changed!",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Change birth date
export const changeBirthdate = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        birth_date: req.body.birth_date,
      },
      { new: true }
    );

    if (!user) throw new Error("User not found!");

    const { _id, name, email, birth_date, description, avatar, createdAt } =
      user;

    res.status(200).json({
      user: { _id, name, email, birth_date, description, avatar, createdAt },
      message: "Birth date changed!",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Change user description
export const changeDescription = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        description: req.body.description,
      },
      { new: true }
    );

    if (!user) throw new Error("User not found!");

    const { _id, name, email, birth_date, description, avatar, createdAt } =
      user;

    res.status(200).json({
      user: { _id, name, email, birth_date, description, avatar, createdAt },
      message: "Description changed!",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Change user avatar
export const changeAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        avatar: req.body.avatar,
      },
      { new: true }
    );

    if (!user) throw new Error("User not found!");

    const { _id, name, email, birth_date, description, avatar, createdAt } =
      user;

    res.status(200).json({
      user: { _id, name, email, birth_date, description, avatar, createdAt },
      message: "Avatar changed!",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
