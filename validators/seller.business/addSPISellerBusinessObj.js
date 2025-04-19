
const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  spiName: Joi.string().min(3).max(30).required(),
  spiCountryOfCitizenship: Joi.string().guid().required(),
  spiCountryOfBirth: Joi.string().guid().required(),
  spiDateOFBirth: Joi.date().required(),
}).options({ stripUnknown: true });

const validateAddSPISellerBusinessObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddSPISellerBusinessObj;
