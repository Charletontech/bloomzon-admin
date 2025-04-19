const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  shippingPickupId: Joi.string().guid().required(),
  name: Joi.string().required(),
  length: Joi.string().min(1).max(30).required(),
  width: Joi.string().required(),
  height: Joi.string().min(1).max(30).required(),
  weight: Joi.string().min(1).max(30).required(),
  isDefault: Joi.boolean().required(),
}).options({ stripUnknown: true });

const validatePackageShippingPickupObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validatePackageShippingPickupObj;
