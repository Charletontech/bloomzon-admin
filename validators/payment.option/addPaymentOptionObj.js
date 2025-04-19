const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  type: Joi.string().valid("credit", 'debit', 'wallet').required(),
  name: Joi.string().min(3).max(30).required(),
  number: Joi.string().min(15).max(30).required(),
  expiration: Joi.string().required(),
  cvv: Joi.string().min(3).max(3).required(),
  duty: Joi.string().valid('charge', 'deposit', 'withdrawal').required(),
}).options({ stripUnknown: true });

const validateAddPaymentOptionObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddPaymentOptionObj;
