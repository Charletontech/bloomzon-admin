const multer = require("multer");
const Datauri = require("datauri/parser");
const path = require("path");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage });

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
});

const dUri = new Datauri();
const dataUri = (req) =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const dataUriArray = (file) =>
  dUri.format(path.extname(file.originalname).toString(), file.buffer);

module.exports = { multerUploads, dataUri, dataUriArray, upload };
