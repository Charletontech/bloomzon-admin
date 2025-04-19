const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  withdrawalId: Joi.string().trim().min(1).required(),
  status: Joi.string().valid("completed", "declined").required(),
  trxHash: Joi.string().allow(""),
}).unknown(false);

const validateProcessWithdrawal = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateProcessWithdrawal;
