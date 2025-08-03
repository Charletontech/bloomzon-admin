const { ReelsNotifications } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const markReelsNotificationAsRead = async (req, next) => {
  try {
    const { id } = req.params;
    const notification = await ReelsNotifications.findByPk(id);
    if (!notification) {
      throw next(new ErrorResponse("Notification not found", 404));
    }
    await notification.update({ isRead: true });
    return notification;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = markReelsNotificationAsRead;
