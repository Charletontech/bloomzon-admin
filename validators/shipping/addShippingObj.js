const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  rate: Joi.string().min(1).max(30).required(),
  address: Joi.string().min(1).max(300).required(),
  itemRate: Joi.string().min(1).max(300).required(),
  type: Joi.string().valid('regional', 'national').required(),
  timing: Joi.string().min(1).max(300).required(),
}).options({ stripUnknown: true });

const validateAddRegionObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddRegionObj;
