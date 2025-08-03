const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  duration: Joi.number().required(),
  status: Joi.string().valid("active", "expired", "cancelled"),
  freeDeliveryEligibility: Joi.string().valid("eligible", "not eligible"),
  discountEligibility: Joi.string().valid("eligible", "not eligible"),
  walletBalance: Joi.number().min(0),
  stateProvince: Joi.string().required(),
  country: Joi.string().required(),
});

const validateEliteMembership = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body, { abortEarly: false });
    req.body = value;
    return next();
  } catch (err) {
    return next(
      new ErrorResponse(err.details.map((d) => d.message).join(", "), 400)
    );
  }
};

module.exports = validateEliteMembership;
