const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
    sellerStoreId: Joi.string().guid().required(),
    name : Joi.string().required(),
    reasons: Joi.array().min(1).required(),
}).options({ stripUnknown: true });

const validateAddStoreReturnResolutionObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddStoreReturnResolutionObj;
