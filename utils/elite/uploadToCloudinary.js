const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadToCloudinary = async (filePath, folderName, type) => {
  const fileUploadResult = await cloudinary.uploader.upload(filePath, {
    folder: folderName,
    resource_type: "raw",
    // resource_type: type || "auto",
    quality: "auto",
    fetch_format: "auto",
  });
  // console.log("file uploaded successfully:", fileUploadResult);
  return fileUploadResult;
};

module.exports = uploadToCloudinary;
