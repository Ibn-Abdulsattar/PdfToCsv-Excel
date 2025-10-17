// middleware/upload.js
import multer from "multer";

// In-memory storage (Vercel compatible)
const storage = multer.memoryStorage();

// File filter – only PDF files allowed
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed!"), false);
};

// Multer config
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter,
});

// Upload error handling
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ success: false, error: "File too large. Max 50MB." });
  }
  if (err.message === "Only PDF files are allowed!") {
    return res
      .status(400)
      .json({ success: false, error: "Only PDF files are allowed!" });
  }
  next(err);
};

export { upload, handleUploadError };
