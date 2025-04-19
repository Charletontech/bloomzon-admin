
const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerBusinessId: Joi.string().guid().required(),
  avCity: Joi.string().min(3).max(30).required(),
  avStreet: Joi.string().min(3).max(30).required(),
  avResidential: Joi.string().guid().required(),
  avState: Joi.string().min(3).max(30).required(),
  avZip: Joi.string().min(3).max(30).required(),
  businessOwnershipStatus: Joi.bool().required(),
  businessLegalStatus: Joi.bool().required(),
  incorperation: Joi.bool().required(),
}).options({ stripUnknown: true });

const validateAddAVSellerBusinessObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddAVSellerBusinessObj;