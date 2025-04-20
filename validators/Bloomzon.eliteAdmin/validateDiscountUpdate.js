// === Validator: discountValidator.js ===
const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const discountUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  discountProductId: Joi.string().uuid().optional(),
  discountType: Joi.string().valid("percentage", "fixed").optional(),
  discountAmount: Joi.number().optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
  eligibleCountries: Joi.array().items(Joi.string()).optional(),
  eligibleRegions: Joi.array().items(Joi.string()).optional(),
  isActive: Joi.boolean().optional(),
});

const validateDiscountUpdate = async (req, res, next) => {
  try {
    const value = await discountUpdateSchema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateDiscountUpdate;
