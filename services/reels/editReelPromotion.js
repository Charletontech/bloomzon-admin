const { ReelPromotions } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const editReelPromotion = async (req, next) => {
  try {
    const promotionId = req.params.id;
    const promotion = await ReelPromotions.findByPk(promotionId);

    if (!promotion) {
      throw next(
        new ErrorResponse("Promotion not found. Check promotion ID", 404)
      );
    }

    // Update the promotion with new values
    await promotion.update(req.body);

    return `Successfully updated promotion for reel: ${promotion.videoId}`;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = editReelPromotion;
