const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  id: Joi.string().uuid().required(),
  action: Joi.string().valid("subscribe", "renew", "cancel").required(),
});

const validateManageSubscription = async (req, res, next) => {
  try {
    // validating request body
    const value = await schema.validateAsync(req.body);
    req.body = value;

    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateManageSubscription;
