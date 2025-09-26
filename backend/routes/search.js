import express from "express";
import User from "../models/User.js";
import Pricing from "../models/Pricing.js";
import Subscription from "../models/Subscription.js";
import Conversion from "../models/Conversion.js";
import Support from "../models/Support.js";
import { auth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    // Run parallel queries for performance
    const [users, pricing, subscriptions, conversions, supports] =
      await Promise.all([
        User.find({
          $or: [
            { username: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
          ],
        }).select("-password"),

        Pricing.find({ title: { $regex: keyword, $options: "i" } }),

        Subscription.find()
          .populate("user", "username email")
          .or([
            { plan: { $regex: keyword, $options: "i" } },
            { status: { $regex: keyword, $options: "i" } },
          ]),

        Conversion.find({
          fileName: { $regex: keyword, $options: "i" },
        }).populate("user", "username email"),

        Support.find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
            { subject: { $regex: keyword, $options: "i" } },
            { message: { $regex: keyword, $options: "i" } },
          ],
        }),
      ]);

    res.json({
      users,
      pricing,
      subscriptions,
      conversions,
      supports,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
