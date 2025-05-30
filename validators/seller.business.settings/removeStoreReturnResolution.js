const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerBusinessStoreResolutionId: Joi.string().guid().required()
}).options({ stripUnknown: true });

const validateRemoveStoreReturnResolutionObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateRemoveStoreReturnResolutionObj;
