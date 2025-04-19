const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");
const deleteFile = require("../../utils/elite/deleteFile");

const schema = Joi.object({
  title: Joi.string().required(),
  bookDescription: Joi.string().required(),
  language: Joi.string().required(),
  genre: Joi.string(),
  bookPrice: Joi.number().required(),
  totalPages: Joi.number().required(),
  dimension: Joi.string(),
  publisherName: Joi.string().required(),
  publicationDate: Joi.string().required(),
  stickyNotes: Joi.boolean(),
  pageFlipOption: Joi.boolean(),
  authorName: Joi.string().required(),
  authorDescription: Joi.string().required(),
});

const validateBookObj = async (req, res, next) => {
  const uploadedFiles = req.files;
  try {
    // validating request body
    const requestBody = JSON.parse(req.body.dataFields);
    const value = await schema.validateAsync(requestBody);
    req.body.dataFields = value;

    // validating request files

    let hasCoverImage = false;
    let hasBook = false;
    let hasAuthorImage = false;

    if (
      uploadedFiles.coverImage[0].fieldname === "coverImage" &&
      uploadedFiles.coverImage[0].mimetype.startsWith("image/")
    ) {
      hasCoverImage = true;

      // check for image file size limit
      const fileSize = uploadedFiles.coverImage[0].size;
      maxSize = 5 * 1024 * 1024;
      if (fileSize > maxSize) {
        throw new Error("Cover image File size exceeds 5MB limit");
      }
    }

    if (
      uploadedFiles.authorImage[0].fieldname === "authorImage" &&
      uploadedFiles.authorImage[0].mimetype.startsWith("image/")
    ) {
      hasAuthorImage = true;

      // check for image file size limit
      const fileSize = uploadedFiles.authorImage[0].size;
      maxSize = 5 * 1024 * 1024;
      if (fileSize > maxSize) {
        throw new Error("Author image File size exceeds 5MB limit");
      }
    }

    if (
      (uploadedFiles.bookFile[0].fieldname === "bookFile" &&
        uploadedFiles.bookFile[0].mimetype === "application/pdf") ||
      uploadedFiles.bookFile[0].mimetype === "application/epub+zip"
    ) {
      hasBook = true;

      // check for book file size limit
      const fileSize = uploadedFiles.bookFile[0].size;
      maxSize = 10 * 1024 * 1024;
      if (fileSize > maxSize) {
        throw new Error("Author image File size exceeds 10MB limit");
      }
    }

    // Check if we found exactly one image and one Book
    if (!hasCoverImage || !hasBook || !hasAuthorImage) {
      throw new Error(
        "You must upload:  author image file (jpg/png),  cover image file (jpg/png) and  book file (pdf/epub)."
      );
    }

    return next();
  } catch (err) {
    // clean up temporary files
    Object.values(uploadedFiles).forEach((file) => {
      deleteFile(file[0].path);
    });
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateBookObj;
