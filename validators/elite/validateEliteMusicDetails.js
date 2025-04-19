const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");
const deleteFile = require("../../utils/elite/deleteFile");

const schema = Joi.object({
  trackName: Joi.string().required(),
  trackDescription: Joi.string().required(),
  trackDuration: Joi.string().required(),
  artistName: Joi.string().required(),
  albumName: Joi.string(),
  genre: Joi.string(),
  language: Joi.string(),
  releaseDate: Joi.string(),
});

const validateEliteMusicDetails = async (req, res, next) => {
  const uploadedFiles = req.files;
  try {
    // validating request body
    const requestBody = JSON.parse(req.body.dataFields);
    const value = await schema.validateAsync(requestBody);
    req.body.dataFields = value;

    // validating request files
    if (!uploadedFiles) {
      throw new Error("both audio and thumbnail files are missing.");
    }

    if (uploadedFiles.length !== 2) {
      throw new Error("You must upload 1 audio and 1 image/thumbnail files.");
    }

    let hasImage = false;
    let hasAudio = false;

    for (const file of uploadedFiles) {
      const mimeType = file.mimetype;

      if (mimeType.startsWith("image/")) {
        hasImage = true;
      } else if (mimeType.startsWith("audio/")) {
        hasAudio = true;
      }
    }

    // Check if we found exactly one image and one video
    if (!hasImage || !hasAudio) {
      throw new Error("You must upload one image file and one audio file.");
    }
    return next();
  } catch (err) {
    uploadedFiles.forEach((file) => {
      deleteFile(file.path);
    });
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateEliteMusicDetails;
