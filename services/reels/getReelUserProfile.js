const {
  ReelUsers,
  ReelsNotificationSettings,
  ReelsNotifications,
  Reels,
  Follower,
} = require("../../models");

const getReelUserProfile = async (req, next) => {
  try {
    const { id } = req.params;

    const user = await ReelUsers.findOne({
      where: { userId: id },
      attributes: { exclude: ["password"] },
      include: [{ model: ReelsNotificationSettings, as: "settings" }],
    });

    if (!user) {
      const ErrorResponse = require("../../utils/errorResponse");
      throw next(new ErrorResponse("Reel user not found", 404));
    }

    // Get counts
    const reelsCount = await Reels.count({ where: { userId: id } });
    const notificationsCount = await ReelsNotifications.count({
      where: { userId: id },
    });
    const followersCount = await Follower.count({ where: { followingId: id } });
    const followingCount = await Follower.count({ where: { followerId: id } });

    return {
      ...user.toJSON(),
      reelsCount,
      notificationsCount,
      followersCount,
      followingCount,
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getReelUserProfile;
