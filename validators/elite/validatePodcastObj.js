const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");
const deleteFile = require("../../utils/elite/deleteFile");

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  language: Joi.string(),
  category: Joi.string(),
});

const validatePodcastObj = async (req, res, next) => {
  const uploadedFiles = req.files;
  try {
    // validating request body
    const requestBody = JSON.parse(req.body.dataFields);
    const value = await schema.validateAsync(requestBody);
    req.body.dataFields = value;

    // validating request files
    if (!uploadedFiles) {
      throw new Error("cover image file is missing.");
    }

    if (uploadedFiles.length !== 1) {
      throw new Error("You can only upload one image file.");
    }

    for (const file of uploadedFiles) {
      const mimeType = file.mimetype;

      if (!mimeType.startsWith("image/")) {
        throw new Error("You can only upload an image file");
      }
    }

    return next();
  } catch (err) {
    uploadedFiles.forEach((file) => {
      deleteFile(file.path);
    });
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validatePodcastObj;
