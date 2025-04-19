const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  viewerId: Joi.string().required(),
  podcastEpisodeId: Joi.string().required(),
  viewerCountry: Joi.string().required(),
  durationListened: Joi.string().required(),
  completedPlaying: Joi.boolean().required(),
});

const podcastPlayedObj = async (req, res, next) => {
  try {
    // validating request body
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = podcastPlayedObj;
