const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  sellerBusinessStoreId: Joi.string().guid().required(),
  taxClass: Joi.string().valid('individual', 'business').required(),
  taxUSCitizen: Joi.string().valid('yes', 'no', 'not sure').required(),
  taxReturnName: Joi.string().required(),
  taxTradeName: Joi.string().required(),
  taxTradeAddress: Joi.string().required(),
  taxType: Joi.string().valid('tin').required(),
  taxNumber: Joi.string().required(),
}).options({ stripUnknown: true });

const validateAddStoreTaxObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddStoreTaxObj;
