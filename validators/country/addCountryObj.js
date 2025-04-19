const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  abbreviation: Joi.string().min(2).max(30).required(),
  capital: Joi.string().min(2).max(30).required(),
  phone: Joi.string().min(1).max(30).required(),
  currency: Joi.string().min(2).max(30).required(),
  population: Joi.string().min(2).max(30).required(),
  images: Joi.any(),
  status: Joi.string().valid('active', 'inactive').required(),
  RegionId: Joi.string().guid().required(),
}).options({ stripUnknown: true });

const validateAddCountryObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddCountryObj;
