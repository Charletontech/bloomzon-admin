const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  keywords: Joi.string().optional(),
  productId: Joi.string().required(),
  productName: Joi.string().required(),
  productCategory: Joi.string().required(),
  productSubCategory: Joi.string().optional(),
  locations: Joi.string().optional(),
  audience: Joi.string().valid("everyone", "followers", "only-you").required(),
  moreOptions: Joi.string().required(),
  isPremiumReel: Joi.string().optional(),
});

const createReelObj = async (req, res, next) => {
  try {
    // validating request body
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = createReelObj;
