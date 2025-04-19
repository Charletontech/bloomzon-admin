const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  planFeatureId: Joi.string().guid().required(),
  name: Joi.string().valid('monthly', 'quarterly', 'biannual', 'yearly').required(),
  planId: Joi.string().guid().required(),
  countryId: Joi.string().guid().required(),
  amount: Joi.number().required(),
  description: Joi.string().min(3).max(150).required(),
}).options({ stripUnknown: true });

const validateEditPlanFeatureObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateEditPlanFeatureObj;
