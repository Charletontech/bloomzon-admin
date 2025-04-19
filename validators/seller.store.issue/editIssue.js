const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  issueId: Joi.string().guid().required(),
  sellerStoreId: Joi.string().guid().required(),
  description: Joi.string().required(),
  title: Joi.string().required(),
}).options({ stripUnknown: true });

const validateEditIssueObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateEditIssueObj;
