const { EliteMembership, Discount } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");
const { Op } = require("sequelize");

const getDashboardAnalytics = async (req, next) => {
  try {
    // 1. Total elite members
    const totalEliteMembers = await EliteMembership.count();

    // 2. Active subscriptions
    const activeSubscriptions = await EliteMembership.count({
      where: { status: "active" },
    });

    // 3. Active discounts (isActive is true and endDate is in the future or today)
    const now = new Date();
    const activeDiscounts = await Discount.count({
      where: {
        isActive: true,
        endDate: { [Op.gte]: now },
      },
    });

    return {
      totalEliteMembers,
      activeSubscriptions,
      activeDiscounts,
    };
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = getDashboardAnalytics;
