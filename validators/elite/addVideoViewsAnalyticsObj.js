const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  videoId: Joi.string().required(),
  durationWatched: Joi.number().required(),
  finishedWatching: Joi.boolean().required(),
});

const addVideoViewsAnalyticsObj = async (req, res, next) => {
  try {
    // validating request body
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = addVideoViewsAnalyticsObj;
