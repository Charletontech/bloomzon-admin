const { ReelSales, sequelize } = require("../../models");
const { Op } = require("sequelize");
const ErrorResponse = require("../../utils/errorResponse");

const getDailySalesSummary = async (req, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      throw next(new ErrorResponse("startDate and endDate are required", 400));
    }

    const salesSummary = await ReelSales.findAll({
      attributes: [
        [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
        [sequelize.fn("SUM", sequelize.col("amountSold")), "totalAmountSold"],
      ],
      where: {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      group: [sequelize.fn("DATE", sequelize.col("createdAt"))],
      order: [[sequelize.fn("DATE", sequelize.col("createdAt")), "ASC"]],
    });

    return { success: true, data: salesSummary };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getDailySalesSummary;
