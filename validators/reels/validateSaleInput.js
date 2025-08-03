const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  reelId: Joi.string().required(),
  productId: Joi.string().required(),
  productName: Joi.string().optional(),
  sellerId: Joi.string().required(),
  pageName: Joi.string().optional().allow(null),
  amountSold: Joi.number().required(),
  quantitySold: Joi.number().integer().min(1).default(1),
  sellerFeeType: Joi.string().valid("commission", "flat").required(),
  sellerFee: Joi.number().required(),
});

const validateSaleInput = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    next();
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateSaleInput;
