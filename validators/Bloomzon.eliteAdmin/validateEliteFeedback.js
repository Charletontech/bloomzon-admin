const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const feedbackSchema = Joi.object({
  eliteMemberId: Joi.string().uuid().required(),
  feedbackMessage: Joi.string().required(),
  feedbackType: Joi.string().valid(
    "suggestion",
    "complaint",
    "praise",
    "other"
  ),
});

const validateEliteFeedback = async (req, res, next) => {
  try {
    const value = await feedbackSchema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateEliteFeedback;
