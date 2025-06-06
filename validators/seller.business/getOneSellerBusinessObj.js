const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerBusinessId: Joi.string().guid().required()
}).options({ stripUnknown: true });

const validateGetOneSellerBusinessObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.query);
    req.query = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateGetOneSellerBusinessObj;