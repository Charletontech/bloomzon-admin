
const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerBusinessId: Joi.string().guid().required(),
  ivIdentityProof: Joi.string().min(3).max(30).required(),
  ivIdentityProof: Joi.string().min(3).max(30).required(),
  ivCountryOfIssue: Joi.string().guid().required(),
  ivIdentityProofNumber: Joi.string().min(3).max(30).required(),
  ivIdentityProofDateOfExpiry: Joi.date().required(),
}).options({ stripUnknown: true });

const validateAddIVSellerBusinessObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddIVSellerBusinessObj;