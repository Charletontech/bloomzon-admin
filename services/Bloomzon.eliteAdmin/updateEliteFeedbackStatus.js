const ErrorResponse = require("../../utils/errorResponse");
const { EliteFeedback } = require("../../models");

const updateEliteFeedbackStatus = async (req, next) => {
  try {
    const { feedbackId, status } = req.body;

    const feedback = await EliteFeedback.findOne({ where: { feedbackId } });
    if (!feedback) throw new Error("Feedback not found.");

    feedback.status = status;
    await feedback.save();

    return feedback;
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = updateEliteFeedbackStatus;
