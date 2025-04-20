const ErrorResponse = require("../../utils/errorResponse");
const { EliteFeedback } = require("../../models");

const submitEliteFeedback = async (req, next) => {
  try {
    const { eliteMemberId, feedbackMessage, feedbackType } = req.body;

    const newFeedback = await EliteFeedback.create({
      eliteMemberId,
      feedbackMessage,
      feedbackType,
    });

    return newFeedback;
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = submitEliteFeedback;
