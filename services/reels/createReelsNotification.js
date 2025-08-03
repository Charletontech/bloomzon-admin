const {
  ReelsNotifications,
  ReelUsers,
  ReelsNotificationSettings,
} = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const createReelsNotification = async (req, next) => {
  try {
    const { userId, type, message, isRead } = req.body;

    // Ensure the user exists
    const user = await ReelUsers.findByPk(userId);
    if (!user) {
      throw next(new ErrorResponse("Reel user not found", 404));
    }

    // Fetch user's notification settings
    const settings = await ReelsNotificationSettings.findOne({
      where: { userId },
    });
    if (!settings) {
      throw next(
        new ErrorResponse("Notification settings not found for user", 404)
      );
    }

    // Map notification type to settings key
    const typeToSetting = {
      like: "likes",
      comment: "comments",
      follow: "newFollowers",
      post: "newPosts",
    };

    const settingKey = typeToSetting[type];
    if (!settingKey || settings[settingKey] === false) {
      throw next(
        new ErrorResponse(`User has disabled '${type}' notifications`, 403)
      );
    }

    const notification = await ReelsNotifications.create({
      userId,
      type,
      message,
      isRead: isRead ?? false,
    });

    return notification;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = createReelsNotification;
