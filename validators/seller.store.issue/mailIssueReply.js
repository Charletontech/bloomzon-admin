const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  issueMailId: Joi.string().guid().required(),
  files: Joi.array().any(),
  message: Joi.string(),
}).options({ stripUnknown: true });

const validateMailIssueReplyObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateMailIssueReplyObj;
