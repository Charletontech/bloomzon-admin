const express = require("express");

const router = express.Router();

// controllers
const {
  createReel,
  promoteReel,
  editReel,
  editReelPromotion,
  incrementReelViews,
  toggleLike,
  comments,
  getAllReels,
  getPromotedReels,
  deleteReel,
  getUserReels,
  createReelUser,
  editReelUser,
  editReelsNotificationSettings,
  createReelsNotification,
  markReelsNotificationAsRead,
  getReelsNotifications,
  getReelUserProfile,
  getPaginatedUserReels,
  likeUserPage,
  unLikeUserPage,
  followUser,
  unfollowUser,
} = require("../controllers/reels");

// middlewares
const { protect, verified } = require("../middleware/auth");
const { multerFileUpload, multerBookUpload } = require("../middleware/elite");

// validators
const {
  createReelObj,
  toggleLikeObj,
  promoteReelObj,
  editReelObj,
  editReelPromotionObj,
  createReelUserObj,
  editReelUserObj,
  editReelsNotificationSettingsObj,
  createReelsNotificationObj,
} = require("../validators/reels");
const reelCommentObj = require("../validators/reels/reelCommentObj");

// routes
router.post(
  "/create-reel",
  protect,
  verified,
  multerFileUpload.fields([{ name: "reel", maxCount: 1 }]),
  createReelObj,
  createReel
);

router.put(
  "/edit-reel/:id",
  protect,
  verified,
  multerFileUpload.fields([{ name: "reel", maxCount: 1 }]),
  editReelObj,
  editReel
);

router.post("/promote-reel", protect, verified, promoteReelObj, promoteReel);
router.put(
  "/edit-reel-promotion/:id",
  protect,
  verified,
  editReelPromotionObj,
  editReelPromotion
);

router.put("/increment-reel-views/:id", protect, verified, incrementReelViews);
router.post(
  "/toggle-reel-like/:id",
  toggleLikeObj,
  protect,
  verified,
  toggleLike
);

router.post("/reel-comment/:id", protect, verified, reelCommentObj, comments);
router.get("/get-all-reels", protect, verified, getAllReels);
router.get("/user-reels/:userId", protect, verified, getUserReels);
router.get("/get-promoted-reels", protect, verified, getPromotedReels);

router.delete("/delete-reel/:id", protect, verified, deleteReel);
// new
router.post(
  "/register-reel-user",
  protect,
  verified,
  multerFileUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  createReelUserObj,
  createReelUser
);

router.put(
  "/edit-reel-user/:userId",
  protect,
  verified,
  editReelUserObj,
  multerFileUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  editReelUser
);

router.post("/like-page", likeUserPage);
router.post("/unlike-page", unLikeUserPage);
router.post("/follow-page", followUser);
router.post("/unfollow-page", unfollowUser);

router.put(
  "/edit-reels-notification-settings/:userId",
  protect,
  verified,
  editReelsNotificationSettingsObj,
  editReelsNotificationSettings
);

router.post(
  "/create-reels-notification",
  protect,
  verified,
  createReelsNotificationObj,
  createReelsNotification
);

router.put(
  "/mark-reels-notification-read/:id",
  protect,
  verified,
  markReelsNotificationAsRead
);

router.get(
  "/reels-notifications/:userId",
  protect,
  verified,
  getReelsNotifications
); // /reels-notifications/:userId?limit=10&page=1

router.get("/reel-user-profile/:id", protect, verified, getReelUserProfile);
router.get(
  "/get-paginated-user-reels/:userId",
  protect,
  verified,
  getPaginatedUserReels
); // /user-reels/:userId?limit=10&page=1 returns paginated reels

// move from here to admin

// middleware creation for different user status
module.exports = router;
