
const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerBusinessId: Joi.string().guid().required(),
  type: Joi.string().min(3).max(30).required(),
  number: Joi.string().min(3).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
  cvv: Joi.string().min(3).max(30).required(),
  expiration: Joi.string().min(3).max(30).required(),
  billingAddress: Joi.string().min(3).max(30).required(),
}).options({ stripUnknown: true });


const validateAddBASellerBusinessObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddBASellerBusinessObj;