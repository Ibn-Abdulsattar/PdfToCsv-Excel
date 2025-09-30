// controllers/convertController.js
import pdfProcessor from "../services/pdfProcessor.js";
import csvGenerator from "../services/csvGenerator.js";
import excelGenerator from "../services/excelGenerator.js";
import fs from "fs";
import path from "path";
import Subscription from "../models/Subscription.js";
import Conversion from "../models/Conversion.js";
import ExpressError from "../utils/ExpressError.js";
import User from '../models/User.js'

class ConvertController {
  // Middleware: Check if user can convert
  async checkLimits(req, res, next) {
    try {
      const userId = req.user.id; // user mil raha hai auth middleware se

      let subscription = await Subscription.findOne({
        user: userId,
        status: "active",
      });

      // Agar subscription nahi hai to free trial assign karo
      if (!subscription) {
        subscription = await Subscription.create({
          user: userId,
          plan: "free",
          pageLimit: 4, // free plan me 4 pages
        });
      }

      // Subscription expired check karo
      if (subscription.endDate && subscription.endDate < new Date()) {
        subscription.status = "expired";
        await subscription.save();
        return res.status(402).json({
          success: false,
          error: "Subscription expired",
          upgradeRequired: true,
        });
      }

      // Limit check
      if (subscription.pagesUsed >= subscription.pageLimit) {
        return res.status(402).json({
          success: false,
          error: "Conversion limit reached",
          message: "Please upgrade your plan to continue",
          upgradeRequired: true,
        });
      }

      req.subscription = subscription; // next steps ke liye save kar do
      next();
    } catch (error) {
      console.error("Error checking limits:", error);
      res
        .status(500)
        .json({ success: false, error: "Error checking conversion limits" });
    }
  }

  async saveConversion(
    userId,
    fileName,
    pdfResult,
    usedUnder,
    status = "success"
  ) {
    const pagesConverted =
      pdfResult.pagesProcessed || pdfResult.totalPages || 1;

    await Conversion.create({
      user: userId,
      fileName,
      pagesConverted,
      usedUnder,
      status,
    });

    const subscription = await Subscription.findOne({ user: userId });
    if (subscription && subscription.status !== "expired") {
      subscription.pagesUsed += pagesConverted;
      await subscription.save();
    }
  }

  // Convert PDF to CSV
  async convertToCSV(req, res) {
    let tempFilePath = null;
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, error: "No PDF file uploaded" });
      }

      tempFilePath = req.file.path;
      const originalName = req.file.originalname;
      const userId = req.user.id;
      const subscription = req.subscription;

      const pdfResult = await pdfProcessor.processPDF(tempFilePath);

      const csvContent = csvGenerator.generateCSV(pdfResult.data);
      const csvFileName = csvGenerator.generateFileName(originalName);
      const csvFilePath = await csvGenerator.saveCSVFile(
        csvContent,
        csvFileName
      );

      // Save conversion
      // inside convertToCSV
      // Save conversion
      await this.saveConversion(
        userId,
        originalName,
        pdfResult, // pass full result, not just pages
        subscription.plan === "free" ? "free_trial" : "subscription"
      );

      res.json({
        success: true,
        message: "PDF converted to CSV successfully",
        data: {
          originalFileName: originalName,
          csvFileName,
          downloadUrl: `/api/download/csv/${csvFileName}`,
          totalRows: pdfResult.totalRows,
          totalColumns: pdfResult.totalColumns,
          preview: pdfResult.data.slice(0, 5),
        },
      });
    } catch (error) {
      console.error("Conversion Error:", error);
      res.status(500).json({ success: false, error: error.message });
    } finally {
      if (tempFilePath && fs.existsSync(tempFilePath))
        fs.unlinkSync(tempFilePath);
    }
  }

  // Convert PDF to Excel
  async convertToExcel(req, res) {
    let tempFilePath = null;
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, error: "No PDF file uploaded" });
      }

      tempFilePath = req.file.path;
      const originalName = req.file.originalname;
      const userId = req.user.id;
      const subscription = req.subscription;

      const pdfResult = await pdfProcessor.processPDF(tempFilePath);

      const workbook = await excelGenerator.generateExcel(pdfResult.data);
      const excelFileName = excelGenerator.generateFileName(originalName);
      const excelFilePath = await excelGenerator.saveExcelFile(
        workbook,
        excelFileName
      );

      // Save conversion
      // inside convertToExcel
      // Save conversion
      await this.saveConversion(
        userId,
        originalName,
        pdfResult,
        subscription.plan === "free" ? "free_trial" : "subscription"
      );

      res.json({
        success: true,
        message: "PDF converted to Excel successfully",
        data: {
          originalFileName: originalName,
          excelFileName,
          downloadUrl: `/api/download/excel/${excelFileName}`,
          totalRows: pdfResult.totalRows,
          totalColumns: pdfResult.totalColumns,
          preview: pdfResult.data.slice(0, 5),
        },
      });
    } catch (error) {
      console.error("Excel Conversion Error:", error);
      res.status(500).json({ success: false, error: error.message });
    } finally {
      if (tempFilePath && fs.existsSync(tempFilePath))
        fs.unlinkSync(tempFilePath);
    }
  }

  // Download CSV
  async downloadCSV(req, res) {
    const { filename } = req.params;
    const filePath = path.join("uploads/csv", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, error: "File not found" });
    }

    res.download(filePath);
  }

  // Download Excel
  async downloadExcel(req, res) {
    const { filename } = req.params;
    const filePath = path.join("uploads/excel", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, error: "File not found" });
    }

    res.download(filePath);
  }
}

export const convertController = new ConvertController();

export const allConversion = async (req, res) => {
  const conversions = await Conversion.find()
    .populate("user", "username")
    .sort({ createdAt: -1 });

  if (!conversions.length) {
    throw new ExpressError("No files found", 404);
  }

const user = await User.findById("68caa34e22320734fe227d15");
console.log(user);


  res.status(200).json({ conversions });
};

export const totalFiles = async (req, res) => {
  const totalFiles = await Conversion.countDocuments();

  if (!totalFiles) {
    throw new ExpressError("Files not found", 404);
  }

  return res.status(200).json({ totalFiles });
};

export const filterConversion = async (req, res) => {
  const { startDate, endDate } = req.query;

  const matchStage = {};

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // 👈 Day start

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // 👈 Day end

    matchStage.createdAt = { $gte: start, $lte: end };
  }

  const result = await Conversion.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: "users", // 👈 User collection
        localField: "user", // 👈 Conversion schema ka ref field
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" },
        userName: "$user.username",
      },
    },
    {
      $group: {
        _id: {
          year: "$year",
          month: "$month",
          day: "$day",
          usedUnder: "$usedUnder",
        },
        total: { $sum: 1 },
        pages: { $sum: "$pagesConverted" },
        users: { $addToSet: "$userName" },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        day: "$_id.day",
        usedUnder: "$_id.usedUnder",
        total: 1,
        pages: 1,
        users: 1,
      },
    },
    { $sort: { year: 1, month: 1, day: 1 } },
  ]);

  res.json(result);
};

export const upgrade = async (req, res) => {
  const { pageLimit, plan } = req.body;
  const userId = req.user._id;

  let endDate = null;

  if (plan === "monthly") {
    endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  } else if (plan === "yearly") {
    endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year
  }

  const upgradeUser = await Subscription.findOneAndUpdate(
    { user: userId },
    {
      $set: {
        pagesUsed: 0,
        pageLimit,
        status: "active",
        plan,
        startDate: new Date(),
        endDate,
      },
    },
    { new: true, upsert: true }
  );

  if (!upgradeUser) {
    throw new ExpressError("Subscription upgrade failed", 400);
  }

  return res.status(200).json({
    message: "Subscription upgraded successfully",
    subscription: upgradeUser,
  });
};

