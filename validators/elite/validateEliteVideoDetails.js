const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");
const deleteFile = require("../../utils/elite/deleteFile");

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string(),
  directors: Joi.array(),
  starring: Joi.array(),
  genres: Joi.string(),
  audioLanguage: Joi.string(),
  producers: Joi.array(),
  studio: Joi.string(),
  approvalStatus: Joi.boolean(),
});

const validateEliteVideoDetails = async (req, res, next) => {
  const uploadedFiles = req.files;
  try {
    // validating request body
    const requestBody = JSON.parse(req.body.dataFields);
    const value = await schema.validateAsync(requestBody);
    req.body.dataFields = value;

    // validating request files
    if (!uploadedFiles) {
      throw new Error("video and thumbnail files are missing.");
    }

    if (uploadedFiles.length < 2 || uploadedFiles.length > 3) {
      throw new Error(
        "You must upload not less than two files and not more than three files."
      );
    }

    let hasImage = false;
    let hasVideo = false;

    for (const file of uploadedFiles) {
      const mimeType = file.mimetype;

      if (mimeType.startsWith("image/")) {
        hasImage = true;
      } else if (mimeType.startsWith("video/")) {
        hasVideo = true;
      }
    }

    // Check if we found exactly one image and one video
    if (!hasImage || !hasVideo) {
      throw new Error("You must upload one image file and one video file.");
    }

    return next();
  } catch (err) {
    uploadedFiles.forEach((file) => {
      deleteFile(file.path);
    });
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateEliteVideoDetails;
