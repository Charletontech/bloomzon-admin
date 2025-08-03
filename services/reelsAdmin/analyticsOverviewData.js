const { Op } = require("sequelize");
const moment = require("moment");
const { ReelSales, ReelPromotions, Reels } = require("../../models");

const analyticsOverviewData = async (req) => {
  try {
    const allSalesRecords = await ReelSales.findAll();

    // revenue from sales
    var salesRevenue = 0;
    allSalesRecords.forEach((each) => {
      const { amountSold } = each;
      salesRevenue += amountSold;
    });

    // revenue from promotions
    const totalPromotionsRevenue = await calculateTotalRevenue();

    const activeSellersCount = await countActiveSellers();
    const engagementRate = await calculateEngagementRate();
    return {
      revenue: {
        salesRevenue,
        boostedListingsRevenue: totalPromotionsRevenue,
        totalRevenue: totalPromotionsRevenue + salesRevenue,
      },
      totalReelsSales: allSalesRecords.length,
      totalActiveSellers: activeSellersCount,
      engagementRate: `${engagementRate}%`,
    };
  } catch (err) {
    throw new Error(err);
  }
};

async function calculateTotalRevenue() {
  try {
    const promotions = await ReelPromotions.findAll();

    let totalRevenue = 0;

    promotions.forEach((promo) => {
      const start = moment(promo.startDate);
      const end = moment(promo.endDate);

      // Calculate days difference inclusive
      const days = end.diff(start, "days") + 1;

      const revenue = days * promo.dailyBudget;

      totalRevenue += revenue;
      // console.log(
      //   `daily budget: ${promo.dailyBudget}, days: ${days}, revenue: ${revenue}`
      // );
    });

    return totalRevenue;
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    throw error;
  }
}

async function countActiveSellers() {
  try {
    // Get the date 2 months ago from today
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    // Query distinct sellerIds with recent activity
    const activeSellers = await ReelSales.findAll({
      attributes: ["sellerId"],
      where: {
        createdAt: {
          [Op.gte]: twoMonthsAgo,
        },
      },
      group: ["sellerId"],
      raw: true,
    });

    return activeSellers.length;
  } catch (error) {
    console.error("Error counting active sellers:", error);
    throw error;
  }
}

async function calculateEngagementRate() {
  try {
    const allReels = await Reels.findAll({
      attributes: ["id", "likesCount", "commentsCount", "viewsCount"],
      raw: true,
    });

    const totalReels = allReels.length;

    if (totalReels === 0) {
      return 0; // avoid division by zero
    }

    const engagedReels = allReels.filter(
      (reel) =>
        reel.likesCount > 0 || reel.commentsCount > 0 || reel.viewsCount > 0
    ).length;

    const engagementRate = (engagedReels / totalReels) * 100;

    return parseFloat(engagementRate.toFixed(2));
  } catch (error) {
    console.error("Error calculating engagement rate:", error);
    throw error;
  }
}

module.exports = analyticsOverviewData;
