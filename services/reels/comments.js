const { ReelComments, Reels } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const comments = async (req, next) => {
  try {
    const reel = await Reels.findByPk(req.params.id);
    if (!reel) return next(new ErrorResponse("Reel not found", 404));

    const comment = await ReelComments.create({
      reelId: req.params.id,
      userId: req.body.userId,
      content: req.body.content,
    });

    await reel.increment("commentsCount");
    return "Comment added successfully";
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = comments;
