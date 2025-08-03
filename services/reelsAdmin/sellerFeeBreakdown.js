const { ReelSales } = require("../../models");

const sellerFeeBreakdown = async () => {
  try {
    var totalFlatFeeAmount = 0;
    var totalCommissionAmount = 0;
    const reelSales = await ReelSales.findAll();
    reelSales.forEach((each) => {
      var sellerFeeType = each.sellerFeeType;
      if (sellerFeeType === "commission") {
        const percentageAmount = (each.sellerFee / 100) * each.amountSold;
        totalCommissionAmount += percentageAmount;
      } else {
        totalFlatFeeAmount += each.sellerFee;
      }
    });
    return {
      totalCommissionAmount,
      totalFlatFeeAmount,
    };
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = sellerFeeBreakdown;
