const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  paymentOptionId: Joi.string().guid().required(),
  name: Joi.string().min(3).max(30).required(),
  number: Joi.string().min(15).max(30).required(),
  expiration: Joi.string().required(),
  cvv: Joi.string().min(3).max(3).required(),
  duty: Joi.string().valid('charge', 'deposit', 'withdrawal').required(),
  rank: Joi.string().valid('default', 'others').required(),
}).options({ stripUnknown: true });

const validateEditPaymentOptionObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateEditPaymentOptionObj;
