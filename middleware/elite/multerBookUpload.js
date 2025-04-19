const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "uploads/";

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});

// Define the file upload fields
const multerBookUpload = multer({ storage }).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "bookFile", maxCount: 1 },
  { name: "authorImage", maxCount: 1 },
]);

module.exports = multerBookUpload;
