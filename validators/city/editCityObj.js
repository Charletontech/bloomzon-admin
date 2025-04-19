const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  stateId: Joi.string().guid().required(),
  cityId: Joi.string().guid().required(),
  name: Joi.string().min(3).max(30).required(),
  status: Joi.string().valid('active', 'inactive').required()
}).options({ stripUnknown: true });

const validateUpdateCityObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateUpdateCityObj;
