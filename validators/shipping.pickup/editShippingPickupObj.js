const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  shippingPickupId: Joi.string().guid().required(),
  contactname: Joi.string().required(),
  pincode: Joi.string().min(1).max(30).required(),
  address: Joi.string().required(),
  phone: Joi.string().min(1).max(30).required(),
  cityId: Joi.string().guid().required(),
}).options({ stripUnknown: true });

const validateUpdateShippingPickupObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateUpdateShippingPickupObj;
