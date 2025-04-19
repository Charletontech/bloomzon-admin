const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  pin: Joi.string().min(4).max(4).required(),
  newPin: Joi.string().min(4).max(4).required(),
  password: Joi.string().min(8).max(30),
}).options({ stripUnknown: true });

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateChangePinObj = async (req, res, next) => {
  // console.log("Reached");
  try {
    const value = await schema.validateAsync(req?.body);
    req.body = value;
    next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateChangePinObj;
