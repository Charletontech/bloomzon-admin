const { Reels } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const incrementReelViews = async (req, next) => {
  try {
    const reel = await Reels.findByPk(req.params.id);
    if (!reel) return next(new ErrorResponse("Reel not found", 404));

    await reel.increment("viewsCount");
    return "Reel views incremented successfully";
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = incrementReelViews;
