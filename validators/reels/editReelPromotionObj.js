const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  description: Joi.string().optional(),
  dailyBudget: Joi.number().optional(),
  startDate: Joi.string().optional(),
  endDate: Joi.string().optional(),
  location: Joi.array().optional(),
  ageRange: Joi.array().optional(),
  gender: Joi.string().valid("all", "male", "female").optional(),
  interest: Joi.array().optional(),
  isActive: Joi.boolean().optional(),
});

const editReelPromotionObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = editReelPromotionObj;
