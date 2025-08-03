const asyncHandler = require("../middleware/async");
const {
  createReelService,
  promoteReelService,
  editReelService,
  editReelPromotionService,
  incrementReelViewsService,
  toggleLikeService,
  commentsService,
  getAllReelsService,
  getPromotedReelsService,
  deleteReelService,
  getUserReelsService,
  createReelUserService,
  editReelUserService,
  editReelsNotificationSettingsService,
  createReelsNotificationService,
  markReelsNotificationAsReadService,
  getReelsNotificationsService,
  getReelUserProfileService,
  getPaginatedUserReelsService,
  likeUserPageService,
  unLikeUserPageService,
  followUserService,
  unfollowUserService,
} = require("../services/reels");

const ErrorResponse = require("../utils/errorResponse");

exports.createReel = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await createReelService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.editReel = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await editReelService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.promoteReel = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await promoteReelService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.editReelPromotion = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await editReelPromotionService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.incrementReelViews = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await incrementReelViewsService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.toggleLike = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await toggleLikeService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.comments = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await commentsService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getAllReels = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getAllReelsService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getUserReels = asyncHandler(async (req, res, next) => {
  try {
    const reels = await getUserReelsService(req, next);
    res.status(200).json({
      success: true,
      data: reels,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getPromotedReels = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getPromotedReelsService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.deleteReel = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await deleteReelService(req, next);
    res.status(200).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.createReelUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await createReelUserService(req, next);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.editReelUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await editReelUserService(req, next);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.likeUserPage = asyncHandler(async (req, res, next) => {
  try {
    const user = await likeUserPageService(req, next);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.unLikeUserPage = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await unLikeUserPageService(req, next);
    res.status(200).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.followUser = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await followUserService(req, next);
    res.status(200).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.unfollowUser = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await unfollowUserService(req, next);
    res.status(200).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.editReelsNotificationSettings = asyncHandler(async (req, res, next) => {
  try {
    const settings = await editReelsNotificationSettingsService(req, next);
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.createReelsNotification = asyncHandler(async (req, res, next) => {
  try {
    const notification = await createReelsNotificationService(req, next);
    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.markReelsNotificationAsRead = asyncHandler(async (req, res, next) => {
  try {
    const notification = await markReelsNotificationAsReadService(req, next);
    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getReelsNotifications = asyncHandler(async (req, res, next) => {
  try {
    const notifications = await getReelsNotificationsService(req, next);
    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getReelUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await getReelUserProfileService(req, next);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getPaginatedUserReels = asyncHandler(async (req, res, next) => {
  try {
    const result = await getPaginatedUserReelsService(req, next);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});
