const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  planFeatureId: Joi.string().guid().required(),
  sellerBusinessId: Joi.string().guid().required()
}).options({ stripUnknown: true });

const validateAddSellerPlanObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddSellerPlanObj;
