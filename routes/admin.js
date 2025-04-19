const express = require("express");

const {
    getUsers,
    getGuests,
    getSellers,
    getAdmins,
    getUser,
    suspendUser,
    banUser,
    activateUser,
    unBanUser
} = require("../controllers/admin.js");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  isUserPermitted,
  verifyPassword,
} = require("../middleware/auth");


const { multerUploads } = require("../middleware/multer");

const {
    validateUserObj
} = require("../validators/admin");


router.get("/", protect, verified, authorize('admin'), getUsers);
router.get("/guest", protect, verified, authorize('admin'), getGuests);
router.get("/seller", protect, verified, authorize('admin'), getSellers);
router.get("/admin", protect, verified, authorize('admin'), getAdmins);
router.get("/user", protect, verified, authorize('admin'), validateUserObj, getUser);
router.put("/suspend-account",  protect, verified, authorize('admin'), isUserPermitted("user.block", "user.ban"), validateUserObj, suspendUser);
router.put("/activate-account",  protect, verified, authorize('admin'), isUserPermitted("user.block", "user.ban"), validateUserObj, activateUser);
router.put("/ban-account",  protect, verified, authorize('admin'), isUserPermitted("user.block", "user.ban"), validateUserObj, banUser);
router.put("/unban-account",  protect, verified, authorize('admin'), isUserPermitted("user.block", "user.ban"), validateUserObj, unBanUser);

module.exports = router;