const { ReelSales, Reels } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const createReelSale = async (req, next) => {
  try {
    const { reelId } = req.body;

    const reel = await Reels.findByPk(reelId);
    if (!reel) throw next(new ErrorResponse("Reel not found", 404));

    const sale = await ReelSales.create(req.body);
    await reel.increment("salesCount");

    return "Sale recorded successfully";
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = createReelSale;
