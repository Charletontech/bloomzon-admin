const express = require("express");
const {
  eliteMembership,
  manageSubscription,
  createDiscount,
  getDiscounts,
  submitEliteFeedback,
  getEliteFeedback,
  updateEliteFeedbackStatus,
  getDashboardAnalytics,
  updateDiscount,
  getAllEliteMembers,
} = require("../../controllers/Bloomzon.eliteAdmin/elite.admin");
const {
  validateEliteMembership,
  validateManageSubscription,
  validateDiscountCreation,
  validateGetDiscounts,
  validateEliteFeedback,
  validateFeedbackStatusUpdate,
  validateDiscountUpdate,
} = require("../../validators/Bloomzon.eliteAdmin");
const router = express.Router();

// Route for elite membership
router.post(
  "/register-new-elite-member",
  validateEliteMembership,
  eliteMembership
);

router.get("/all-elite-members", getAllEliteMembers);

router.post(
  "/manage-subscription",
  validateManageSubscription,
  manageSubscription
);

// Route for discounts
router.post("/create-discount", validateDiscountCreation, createDiscount);
router.get("/get-discounts", validateGetDiscounts, getDiscounts); // 3 possible type of responses
router.patch(
  "/update-discount/:discountId",
  validateDiscountUpdate,
  updateDiscount
);

// Route for feedbacks
router.post("/submit-feedback", validateEliteFeedback, submitEliteFeedback);
router.get("/feedback", getEliteFeedback);
router.patch(
  "/update-feedback-status",
  validateFeedbackStatusUpdate,
  updateEliteFeedbackStatus
);

// Route for getting dashboard analytics
router.get("/dashboard-analytics", getDashboardAnalytics);

module.exports = router;
