const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerStoreId: Joi.string().guid().required(),
  capacity: Joi.string().min(1).max(30).required(),
  handlingTime: Joi.string().min(1).max(300).required(),
}).options({ stripUnknown: true });

const validateAddShippingDetailsObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddShippingDetailsObj;
