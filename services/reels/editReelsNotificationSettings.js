const { ReelsNotificationSettings } = require("../../models");

const editReelsNotificationSettings = async (req, next) => {
  try {
    const { userId } = req.params;
    const settings = await ReelsNotificationSettings.findOne({
      where: { userId },
    });
    if (!settings) {
      const ErrorResponse = require("../../utils/errorResponse");
      throw next(
        new ErrorResponse(
          "Notification settings not found - userId does not exist",
          404
        )
      );
    }
    await settings.update(req.body);
    return settings;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = editReelsNotificationSettings;
