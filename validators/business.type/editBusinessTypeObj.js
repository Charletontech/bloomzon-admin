const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  businessTypeId: Joi.string().guid().required(),
  name: Joi.string().min(3).max(30).required(),
}).options({ stripUnknown: true });

const validateEditBusinessTypeObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateEditBusinessTypeObj;
