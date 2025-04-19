const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  paymentOptionId: Joi.string().guid().required(),
  status: Joi.string().valid("active", 'inactive', 'expired').required(),
}).options({ stripUnknown: true });

const validateEditPaymentOptionAdminObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateEditPaymentOptionAdminObj;
