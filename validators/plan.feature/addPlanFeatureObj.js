const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(150).required(),
  name: Joi.string().valid('monthly', 'quarterly', 'biannual', 'yearly').required(),
  planId: Joi.string().guid().required(),
  countryId: Joi.string().guid().required(),
  amount: Joi.number().required(),

}).options({ stripUnknown: true });

const validateAddPlanFeatureObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddPlanFeatureObj;
