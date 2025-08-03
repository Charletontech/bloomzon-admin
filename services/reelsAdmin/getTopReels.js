const ErrorResponse = require("../../utils/errorResponse");
const { Reels, ReelUsers, sequelize } = require("../../models");

const getTopReels = async (req, next) => {
  try {
    const topReels = await Reels.findAll({
      attributes: [
        "id",
        "title",
        "viewsCount",
        "salesCount",
        [sequelize.col("user.pageName"), "sellerName"],
      ],
      include: [
        {
          model: ReelUsers,
          as: "user",
          attributes: [],
        },
      ],
      order: [[sequelize.literal("(viewsCount + salesCount)"), "DESC"]],
      limit: 10,
    });

    return topReels;
  } catch (err) {
    throw next(new ErrorResponse("Failed to fetch top-performing reels", 500));
  }
};

module.exports = getTopReels;
