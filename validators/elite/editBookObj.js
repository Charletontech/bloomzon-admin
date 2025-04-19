const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  title: Joi.string(),
  bookDescription: Joi.string(),
  language: Joi.string(),
  genre: Joi.string(),
  bookPrice: Joi.number(),
  totalPages: Joi.number(),
  dimension: Joi.string(),
  publisherName: Joi.string(),
  publicationDate: Joi.string(),
  stickyNotes: Joi.boolean(),
  pageFlipOption: Joi.boolean(),
  authorName: Joi.string(),
  authorDescription: Joi.string(),
});

const editBookObj = async (req, res, next) => {
  try {
    // validating request body
    const value = await schema.validateAsync(req.body);
    req.body = value;

    // validating request parameters
    const bookId = req.params.bookId;
    if (!bookId) throw new Error("bookId parameter missing");

    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = editBookObj;
