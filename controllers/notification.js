const {
  getAllNotifications,
  readAllNotifications,
  readOneNotification,
} = require("../services/notifications");
const asyncHandler = require("../middleware/async");

exports.getAllNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await getAllNotifications(req, res, next);

  res.status(200).json({
    success: true,
    data: notifications,
  });
});

exports.readAllNotifications = asyncHandler(async (req, res, next) => {
  await readAllNotifications(req, res, next);
  res.status(200).json({
    success: true,
    message: "successful",
  });
});

exports.readOneNotification = asyncHandler(async (req, res, next) => {
  await readOneNotification(req, res, next);
  res.status(200).json({
    success: true,
    message: "successful",
  });
});
