
const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
    sellerBusinessId: Joi.string().guid().required(),
    image: Joi.any(),
}).options({ stripUnknown: true });

const validateAddUploadAVSellerBusinessObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddUploadAVSellerBusinessObj;
