const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerBusinessId: Joi.string().guid().required(),
  countryId: Joi.string().guid().required(),
  state: Joi.string().required(),
  town: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
}).options({ stripUnknown: true });

const validateAddStoreObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddStoreObj;
