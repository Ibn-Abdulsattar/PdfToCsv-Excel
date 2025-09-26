import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  forgot,
  getAllUser,
  getUserStats,
  logout,
  resetPassword,
  signin,
  signup,
  toggleBlockUser,
} from "../controllers/User.js";
import { auth, isAdmin } from "../middleware/auth.js";
const router = express.Router();

// These routes wrap plain async controllers exactly once
router.post("/signup", wrapAsync(signup));
router.post("/signin", wrapAsync(signin));
router.post("/logout", auth, wrapAsync(logout));
router.post("/forgot", wrapAsync(forgot));
router.put("/reset-password/:resetToken", wrapAsync(resetPassword));

router.get("/getAllUser", auth, wrapAsync(getAllUser));
router.put("/toggleBlockUser/:id", auth, wrapAsync(toggleBlockUser));
router.get("/getUserStats", auth, wrapAsync(getUserStats));
// Current User Info

export default router;
