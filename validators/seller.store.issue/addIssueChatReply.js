const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
    issueChatId: Joi.string().guid().required(),
    message: Joi.string().required(),
    files: Joi.array().any(),
    massageType: Joi.string().valid('text', 'image', 'audio', 'video', 'sticker', 'emoji').required(),
}).options({ stripUnknown: true });

const validateAddIssueChatReplyObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddIssueChatReplyObj;
