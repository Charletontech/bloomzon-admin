const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  videoId: Joi.string().required(),
  description: Joi.string().optional(),
  dailyBudget: Joi.number().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  location: Joi.array().required(),
  ageRange: Joi.array().optional(),
  gender: Joi.string().valid("all", "male", "female").optional(),
  interest: Joi.array().optional(),
});

const promoteReelObj = async (req, res, next) => {
  try {
    // validating request body
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = promoteReelObj;
