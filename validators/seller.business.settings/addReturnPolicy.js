const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerBusinessId: Joi.string().guid().required(),
  receiveReturnEmails: Joi.boolean().required(),
  returnInstructions: Joi.string().required(),
  returnAutomation: Joi.string().valid('personal-authorization', 'bloomzon-authorization-standard', 'bloomzon-authorization-all').required(),
}).options({ stripUnknown: true });

const validateAddReturnPolicyObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddReturnPolicyObj;
