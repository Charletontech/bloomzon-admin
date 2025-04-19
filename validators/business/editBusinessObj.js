const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  businessId: Joi.string().guid().required(),
  name: Joi.string().min(3).max(30).required(),
  monthlySubscription: Joi.string().min(1).max(30).required(),
  monthlySubscriptionDiscount: Joi.string().min(1).max(30).required(),
  yearlySubscription: Joi.string().min(1).max(30).required(),
  yearlySubscriptionDiscount: Joi.string().min(1).max(30).required(),
}).options({ stripUnknown: true });

const validateEditBusinessObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateEditBusinessObj;
