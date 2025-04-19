const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const validateDiscountCreation = async (req, res, next) => {
  console.log(req.body);
  const schema = Joi.object({
    title: Joi.string(),
    discountProductId: Joi.string(),
    discountType: Joi.string().valid("percentage", "fixed").required(),
    discountAmount: Joi.number().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    eligibleCountries: Joi.array().items(Joi.string()), // List of country codes
    eligibleRegions: Joi.array().items(Joi.string()), // List of region/state codes
    isActive: Joi.boolean().default(true),
  });

  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateDiscountCreation;
