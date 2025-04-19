const schema = Joi.object({
  issueId: Joi.string().guid().required(),
  files: Joi.array().any(),
  massageType: Joi.string().valid('image', 'audio', 'video', 'sticker', 'emoji').required(),
}).options({ stripUnknown: true });

const validateAddIssueChatImageObj = async (req, res, next) => {
try {
  const value = await schema.validateAsync(req.body);
  req.body = value;
  return next();
} catch (err) {
  return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
}
};

module.exports = validateAddIssueChatImageObj;