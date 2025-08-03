const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  likes: Joi.boolean().optional(),
  comments: Joi.boolean().optional(),
  newFollowers: Joi.boolean().optional(),
  newPosts: Joi.boolean().optional(),
});

const editReelsNotificationSettingsObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = editReelsNotificationSettingsObj;
