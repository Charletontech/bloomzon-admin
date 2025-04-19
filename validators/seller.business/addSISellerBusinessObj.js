
const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");


const schema = Joi.object({
  sellerBusinessId: Joi.string().guid().required(),
  name: Joi.string().min(3).max(30).required(),
  sellToBusiness: Joi.string().min(3).max(30).required(),
  haveUPCs: Joi.bool().required(),
  isManufacturer: Joi.bool().required(),
  productSubCategoryId: Joi.string().guid().required(),
}).options({ stripUnknown: true });

const validateAddSISellerBusinessObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddSISellerBusinessObj;