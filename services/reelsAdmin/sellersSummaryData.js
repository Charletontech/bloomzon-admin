const { ReelUsers, Reels } = require("../../models");

const sellersSummaryData = async (req, next) => {
  try {
    let totalUsers;
    let pendingUsers = 0;
    let totalLikes = 0;
    let totalReels;
    let totalViews = 0;

    const allUsers = await ReelUsers.findAll({ raw: true });
    totalUsers = allUsers.length;
    allUsers.forEach((each) => {
      if (each.status === "pending") {
        pendingUsers++;
      }
    });

    const allReels = await Reels.findAll({ raw: true });
    totalReels = allReels.length;
    allReels.forEach((each) => {
      totalLikes += each.likesCount;
      totalViews += each.viewsCount;
    });

    return {
      totalUsers,
      pendingUsers,
      totalLikes,
      totalReels,
      totalViews,
    };
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = sellersSummaryData;
