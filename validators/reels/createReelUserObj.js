const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  userId: Joi.string().required(),
  pageName: Joi.string().required(),
  fullName: Joi.string().required(),
  bio: Joi.string().max(500).optional().allow(null, ""),
  likesCount: Joi.number().integer().min(0).optional(),
  followersCount: Joi.number().integer().min(0).optional(),
  followingCount: Joi.number().integer().min(0).optional(),
  businessLocation: Joi.string().optional().allow(null, ""),
  phone: Joi.string().optional().allow(null, ""),
  email: Joi.string().email().required(),
  accountRegion: Joi.string().optional().allow(null, ""),
  password: Joi.string().optional(),
  isDeactivated: Joi.boolean().optional(),
  deactivationDate: Joi.date().optional().allow(null, ""),
  otherSocialAccounts: Joi.string().optional().allow(null),
});

const createReelUserObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = createReelUserObj;
