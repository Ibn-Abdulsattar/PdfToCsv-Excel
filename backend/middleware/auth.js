import jwt from "jsonwebtoken";
import ExpressError from "../utils/expressError.js";
import User from "../models/User.js";

// This middleware checks the auth cookie, verifies JWT, and attaches the user to req.user
const auth = (role = "user", allowPending = false) => async (req, res, next) => {
  try {
    // 🔹 Role ke hisaab se alag cookie uthana
    const token = role === "admin" ? req.cookies?.adminToken : req.cookies?.userToken;

    if (!token) throw new ExpressError("Not authenticated", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) throw new ExpressError("User not found", 404);

    if (!allowPending && user.status !== "approved") {
      throw new ExpressError("Your account is blocked. Please contact admin", 403);
    }
    if (role === "admin" && user.role !== "admin") {
      throw new ExpressError("Admin access only", 403);
    }

    req.user = user;
    next();
  } catch (err) {
    next(new ExpressError("Unauthorized: " + err.message, 401));
  }
};


const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return next(new ExpressError("Admin access only", 403));
};

export { auth, isAdmin };
