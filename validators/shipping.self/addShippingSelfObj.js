const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
    name: Joi.string().valid("Standard Shipping", 'Fast-Track Shipping').required(),
    rate: Joi.string().min(1).max(300).required(),
    itemratetype: Joi.string().valid('peritemweight', 'priceband').required(),
    itemRate: Joi.string().min(1).max(300).required(),
    address: Joi.string().min(1).max(300).required(),
    addresstype: Joi.string().valid('street', 'pobox').required(),
    timing: Joi.string().min(1).max(300).required(),
    regions: Joi.array().min(1).required(),
}).options({ stripUnknown: true });

const validateAddShippingSelfObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddShippingSelfObj;
