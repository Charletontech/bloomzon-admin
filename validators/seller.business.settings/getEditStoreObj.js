const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerStoreId: Joi.string().guid().required(),
  countryId: Joi.string().guid().required(),
  marketPlaceName: Joi.string().required(),
  marketPlacePhone: Joi.string().required(),
  marketPlaceEmail: Joi.string().required(),
}).options({ stripUnknown: true });

const validateGetEditStoresObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateGetEditStoresObj;
