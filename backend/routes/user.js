// routes/user.js
import express from "express";
import userService from "../services/userServices.js";
// import { getUserIdentifier } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user status
router.get("/user-status", async (req, res) => {
  try {
    const userIdentifier = req.user;
    const userStats = await userService.getUserStats(userIdentifier);

    res.json({
      success: true,
      userStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// 🧹 Reset user (for testing only)
router.post("/reset-user", async (req, res) => {
  try {
    const userIdentifier = req.user;

    // Reset user in service
    await userService.resetUser(userIdentifier);

    res.json({
      success: true,
      message: "User reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
