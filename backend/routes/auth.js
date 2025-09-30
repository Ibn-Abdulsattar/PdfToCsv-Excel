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
router.post("/logout",  wrapAsync(logout));
router.post("/forgot", wrapAsync(forgot));
router.put("/reset-password/:resetToken", wrapAsync(resetPassword));

router.get("/getAllUser", auth("admin"), isAdmin, wrapAsync(getAllUser));
router.put("/toggleBlockUser/:id", auth("admin"), isAdmin, wrapAsync(toggleBlockUser));
router.get("/getUserStats", auth("admin"), isAdmin, wrapAsync(getUserStats));
router.post("/admin/signin", wrapAsync(signin));
// Current User Info

export default router;
