const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  method: Joi.string().valid('sms', 'bloomzonApp', 'authenticatorApp').required(),
}).options({ stripUnknown: true });

const validateAddVerificationMethodObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddVerificationMethodObj;
