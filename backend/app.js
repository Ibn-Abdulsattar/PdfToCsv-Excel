import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
// import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import Support from "./models/Support.js";

// ES6 modules ke liye __dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.set("trust proxy", 1); // <-- important in production when using sameSite:'none' + secure cookies
app.use(cookieParser());
// app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ DB connection failed:", err));
}
main();
// server.js (after mongoose.connect)
Support.collection.dropIndex("name_1").catch(() => {});
Support.collection.dropIndex("email_1").catch(() => {});

app.use(
  "/api/download/csv",
  express.static(path.join(__dirname, "uploads/csv"))
);
app.use(
  "/api/download/excel",
  express.static(path.join(__dirname, "uploads/excel"))
);

// Create required directories
const createDirectories = () => {
  const dirs = [
    "uploads/temp",
    "uploads/csv",
    "uploads/excel",
    "data", // For storing user data
  ];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Directory created: ${dir}`);
    }
  });
};

createDirectories();

// Import routes
import convertRoutes from "./routes/convert.js";
import userRoutes from "./routes/user.js";
import paymentRoutes from "./routes/payment.js";
import authRoutes from "./routes/auth.js";
import ticketRoutes from "./routes/support.js";
import pricingRoutes from "./routes/pricings.js";
import User from "./models/User.js";
import { auth, isAdmin } from "./middleware/auth.js";
import searchRoutes from "./routes/search.js";

// Use routes
app.use("/api", convertRoutes);
app.use("/api", userRoutes);
app.use("/api", paymentRoutes);
app.use("/user", authRoutes);
app.use("/support", ticketRoutes);
app.use("/pricing", pricingRoutes);
app.use("/search", auth, searchRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "PDF to CSV/Excel Converter with Payment System is running!",
    features: {
      freeLimit: "4 conversion per user",
      paidAccess: "Unlimited conversions after payment",
      pricing: "$9.99 USD",
    },
  });
});

app.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("username email role status");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});


app.get("/admin", auth, isAdmin, async (req, res) => {
  const admin = await User.findById(req.user._id);
  console.log(admin);
  res.send(admin);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    error: error.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`💳 Payment system enabled`);
  console.log(`🆓 Free limit: 1 conversion per user`);
  console.log(`💰 Unlimited access: $9.99`);
});
