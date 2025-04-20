const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const validateGetDiscounts = async (req, res, next) => {
  const schema = Joi.object({
    discountId: Joi.string().optional(),
  });

  try {
    const value = await schema.validateAsync(req.query);
    req.query = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateGetDiscounts;
