const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerStoreId: Joi.string().guid().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
}).options({ stripUnknown: true });

const validateAddIssueObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddIssueObj;
