import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    birth_date: {
      type: Date,
    },
    avatar: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (user) {
  const { name, email, password } = user;

  // name validation
  if (!name) throw new Error("Enter a name!");
  if (name.length < 3)
    throw new Error("The name should be at least 3 characters!");

  // Email validation
  const isEmailFound = await this.findOne({ email });
  if (isEmailFound) throw new Error("Email already taken!");
  if (!email) throw new Error("Enter an email!");
  if (!validator.isEmail(email)) throw new Error("Enter a valid email!");

  // Password validation
  if (!password) throw new Error("Enter a password!");
  if (!validator.isStrongPassword(password))
    throw new Error("Password not strong enough!");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = await this.create({ ...user, password: hash });

  return newUser;
};

userSchema.statics.login = async function (user) {
  const { email, password } = user;

  // Email validation
  if (!email) throw new Error("Enter an email!");

  const foundUser = await this.findOne({ email });
  if (!foundUser) throw new Error("User not found!");

  // Password validation
  if (!password) throw new Error("Enter a password!");
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) throw new Error("Incorrect password!");

  return foundUser;
};

userSchema.statics.checkPassword = async function (
  id,
  oldPassword,
  newPassword,
  newPasswordRepeat
) {
  // Check if user exits
  const foundUser = await this.findById(id);
  if (!foundUser) throw new Error("User not found!");

  // Check password
  if (!oldPassword) throw new Error("Enter your old password!");
  if (!newPassword) throw new Error("Enter your new password!");
  if (!newPasswordRepeat) throw new Error("Enter your new password again!");

  const match = await bcrypt.compare(oldPassword, foundUser.password);
  if (!match) throw new Error("Old password is incorrect!");

  if (newPassword !== newPasswordRepeat)
    throw new Error("Passwords don't match!");

  if (!validator.isStrongPassword(newPassword))
    throw new Error("Password not strong enough!");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  await this.findByIdAndUpdate(id, { password: hash });
};

userSchema.statics.checkEmail = async function (id, email) {
  // Check if user exists
  const foundUser = await this.findById(id);
  if (!foundUser) throw new Error("User not found!");

  // Email validation
  const isEmailFound = await this.findOne({ email });
  if (isEmailFound) throw new Error("Email already taken!");
  if (!email) throw new Error("Enter an email!");
  if (!validator.isEmail(email)) throw new Error("Enter a valid email!");

  await this.findByIdAndUpdate(id, { email });

  const user = await this.findById(id);

  return user;
};

export default mongoose.model("User", userSchema);
