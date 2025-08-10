const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  keywords: Joi.string().optional(),
  productId: Joi.string().optional(),
  productName: Joi.string().optional(),
  productCategory: Joi.string().optional(),
  productSubCategory: Joi.string().optional(),
  locations: Joi.string().optional(),
  audience: Joi.string().valid("everyone", "followers", "only-you").optional(),
  moreOptions: Joi.string().optional(),
  isPremiumReel: Joi.boolean().optional(),
  viewsCount: Joi.number().optional(),
});

const editReelObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = editReelObj;
