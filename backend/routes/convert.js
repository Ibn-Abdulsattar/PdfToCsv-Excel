// routes/convert.js
import express from "express";
import multer from "multer";
import {
  allConversion,
  convertController,
  totalFiles,
  filterConversion,
  upgrade,
} from "../controllers/convertController.js";
import { auth, isAdmin } from "../middleware/auth.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();
const upload = multer({ dest: "uploads/temp/" });

// ✅ Conversion routes
router.post(
  "/pdf-to-csv",
  auth("user"),
  upload.single("pdf"),
  convertController.checkLimits.bind(convertController),
  convertController.convertToCSV.bind(convertController)
);

router.post(
  "/pdf-to-excel",
  auth("user"),
  upload.single("pdf"),
  convertController.checkLimits.bind(convertController),
  convertController.convertToExcel.bind(convertController)
);

// ✅ Download routes
router.get(
  "/download/csv/:filename",
  auth("user"),
  convertController.downloadCSV.bind(convertController)
);

router.get(
  "/download/excel/:filename",
  auth,
  convertController.downloadExcel.bind(convertController)
);

router.get("/allconversion", auth("admin"), isAdmin, wrapAsync(allConversion));

router.get("/totalFiles", auth("admin"), isAdmin, wrapAsync(totalFiles));

router.get("/conversions", auth("admin"), isAdmin, wrapAsync(filterConversion));

router.put('/upgrade', auth("user"), wrapAsync(upgrade));

export default router;
