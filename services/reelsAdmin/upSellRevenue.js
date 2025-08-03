const { ReelPromotions, Reels } = require("../../models");

const upSellRevenue = async () => {
  try {
    const boostedListings = await ReelPromotions.count();
    const premiumReels = await Reels.count({
      where: {
        isPremiumReel: true,
      },
    });

    return {
      boostedListings,
      premiumReels,
    };
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = upSellRevenue;
