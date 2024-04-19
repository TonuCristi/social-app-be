import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import formidable from "formidable";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { fb } from "../firebase.js";

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

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    console.log(files["avatar[]"][0]);

    const imgType = files["avatar[]"][0].mimetype.split("/")[1];

    // const storageRef = ref(fb, `avatars/${id}.${imgType}`);
    // uploadBytes(storageRef, files["avatar[]"][0], {
    //   contentType: `image/${imgType}`,
    // }).then((snapshot) => {
    //   console.log("Uploaded a blob or file!");
    // });

    // const user = await User.findByIdAndUpdate(
    //   id,
    //   {
    //     name: req.body.name,
    //     birth_date: req.body.birth_date,
    //     avatar: req.body.avatar,
    //     description: req.body.description,
    //   },
    //   { new: true }
    // );

    // if (!user) throw new Error("User not found!");

    // const { _id, name, email, birth_date, avatar, description, createdAt } =
    //   user;

    // res
    //   .status(200)
    //   .json({ _id, name, email, birth_date, avatar, description, createdAt });
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

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
