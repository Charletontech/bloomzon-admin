const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  userId: Joi.string().required(),
  type: Joi.string().valid("like", "comment", "follow", "post").required(),
  message: Joi.string().required(),
  isRead: Joi.boolean().optional(),
});

const createReelsNotificationObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = createReelsNotificationObj;
