const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");
const updateStatusSchema = Joi.object({
  feedbackId: Joi.string().uuid().required(),
  status: Joi.string().valid("pending", "reviewed", "resolved").required(),
});

const validateFeedbackStatusUpdate = async (req, res, next) => {
  try {
    const value = await updateStatusSchema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateFeedbackStatusUpdate;
