const { Reels } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const toggleLike = async (req, next) => {
  try {
    const { liked } = req.body; // true = like, false = unlike
    const reel = await Reels.findByPk(req.params.id);
    if (!reel) return next(new ErrorResponse("Reel not found", 404));

    liked
      ? await reel.increment("likesCount")
      : await reel.decrement("likesCount");
    return liked ? "Liked successfully" : "Unliked successfully";
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = toggleLike;
