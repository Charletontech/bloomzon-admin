const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  pin: Joi.string().min(4).max(4).required(),
  token: Joi.string().min(6).max(6).required(),
});

const validateResetPinObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req?.body);
    req.body = value;
    next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateResetPinObj;
