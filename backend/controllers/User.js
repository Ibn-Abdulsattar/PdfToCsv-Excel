import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import ExpressError from "../utils/ExpressError.js";

export const signup = async (req, res) => {
  const { username, email, password, role, status } = req.body;

  const existing = await User.findOne({
    $or: [{ email: email.toLowerCase().trim() }, { username }],
  });
  if (existing) {
    throw new ExpressError("User already exists", 409);
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });
  const token = generateToken(newUser);

  const isProd = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 48 * 60 * 60 * 1000, // 48h
  });

  return res.status(201).json({
    message: "Registered successfully",
    user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role, status: newUser.status  },
  });
};

// This function logs a user in, sets the same cookie, and avoids user-enumeration messages
export const signin = async (req, res) => {
  const { email, password } = req.body;

  // note: select('+password') because the schema hides it by default
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    "+password"
  );
  if (!user) {
    // Generic message to avoid leaking whether an email exists
    throw new ExpressError("Invalid email or password", 400);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ExpressError("Invalid email or password", 400);
  }

  const token = generateToken(user);

  const isProd = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 48 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Welcome back!",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};

// This function clears the auth cookie using the same attributes used when setting it
export const logout = async (req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
  return res.status(200).json({ message: "You are logged out" });
};

export const forgot = async (req, res) => {
  const { email } = req.body;
  const previousUser = await User.findOne({ email });

  if (!previousUser) {
    throw new ExpressError("Invalid email !", 400);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  previousUser.resetPasswordToken = resetPasswordToken;
  previousUser.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //15 min
  await previousUser.save();

  const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

  const message = `Click this link to reset your password ${resetLink}. This link is expired after 15 minutes`;

  await sendEmail(previousUser.email, "passwordReset", message);

  return res.status(200).json({ message: "Please check your Gmail" });
};

export const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  if (!password) {
    throw new ExpressError("Password is required", 400);
  }

  const hashToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ExpressError("Invalid or expired token");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return res.status(200).json({ message: "Password reset successful" });
};

export const getAllUser = async (req, res) => {
  const allUsers = await User.find({ role: "user" }).select("-password");
  res.status(200).json({ allUsers });
};

export const toggleBlockUser = async (req, res) => {
  const { id } = req.params;
  const toggleUser = await User.findById(id);

  if (!toggleUser) {
    throw new ExpressError("User not found", 404);
  }

  toggleUser.status = toggleUser.status === "approved" ? "pending" : "approved";

  await toggleUser.save();

  res.status(200).json({
    message: `User ${
      toggleUser.status === "approved" ? "Unblock" : "Block"
    } successfuly !`,
  });
};

export const getUserStats = async (req, res) => {
  const totalUser = await User.countDocuments();
  const activeUser = await User.countDocuments({ status: "approved" });
  const blockUser = await User.countDocuments({ status: "pending" });
  const totalAdmin = await User.countDocuments({ role: "admin" });

  res.status(200).json({ totalUser, activeUser, blockUser, totalAdmin });
};
