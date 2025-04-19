const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  planId: Joi.string().guid().required(),
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(150).required(),
}).options({ stripUnknown: true });

const validateEditPlanObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateEditPlanObj;
