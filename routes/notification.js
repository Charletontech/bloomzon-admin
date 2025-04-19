const express = require("express");
const {
  getAllNotifications,
  readAllNotifications,
  readOneNotification,
} = require("../controllers/notification");

const router = express.Router();

const { protect, verified } = require("../middleware/auth");

router.get("/", protect, verified, getAllNotifications);
router.put("/", protect, verified, readAllNotifications);
router.put("/:id", protect, verified, readOneNotification);

module.exports = router;
