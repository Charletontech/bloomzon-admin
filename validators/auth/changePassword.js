const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  token: Joi.string().min(6).max(6).required(),
  newPassword: Joi.string().min(8).max(30).required(),
}).options({ stripUnknown: true });

const validatePasswordObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validatePasswordObj;
