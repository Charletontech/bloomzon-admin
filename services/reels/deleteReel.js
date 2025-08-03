const { Reels } = require("../../models");

const deleteReel = async (req, next) => {
  try {
    const { id } = req.params;
    const reel = await Reels.findByPk(id);
    if (!reel) {
      const ErrorResponse = require("../../utils/errorResponse");
      throw next(new ErrorResponse("Reel not found", 404));
    }
    await reel.destroy();
    return { message: "Reel deleted successfully" };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = deleteReel;
