const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  issueId: Joi.string().guid().required(),
  files: Joi.array().any(),
  email: Joi.string().required(),
  phone: Joi.string(),
  message: Joi.string(),
}).options({ stripUnknown: true });

const validateMailIssueObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateMailIssueObj;
