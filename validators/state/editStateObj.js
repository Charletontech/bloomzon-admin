const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  countryId: Joi.string().guid().required(),
  stateId: Joi.string().guid().required(),
  name: Joi.string().min(3).max(30).required(),
  abbreviation: Joi.string().min(2).max(30).required(),
  capital: Joi.string().min(2).max(30).required(),
  status: Joi.string().valid('active', 'inactive').required()
}).options({ stripUnknown: true });

const validateUpdateStateObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateUpdateStateObj;
