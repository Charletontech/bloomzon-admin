const ErrorResponse = require("../../utils/errorResponse");
const { EliteFeedback } = require("../../models");

const getEliteFeedback = async (req, next) => {
  try {
    const { status, feedbackType } = req.query;
    const whereClause = {};

    if (status) whereClause.status = status;
    if (feedbackType) whereClause.feedbackType = feedbackType;

    const feedbacks = await EliteFeedback.findAll({ where: whereClause });
    return feedbacks;
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = getEliteFeedback;
