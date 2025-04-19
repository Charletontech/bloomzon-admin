const express = require("express");
const {
  eliteMembership,
  manageSubscription,
  createDiscount,
  getDiscounts,
} = require("../../controllers/Bloomzon.eliteAdmin/elite.admin");
const {
  validateEliteMembership,
  validateManageSubscription,
  validateDiscountCreation,
  validateGetDiscounts,
} = require("../../validators/Bloomzon.eliteAdmin");
const router = express.Router();

router.post(
  "/register-new-elite-member",
  validateEliteMembership,
  eliteMembership
);

router.post(
  "/manage-subscription",
  validateManageSubscription,
  manageSubscription
);

// Route for creating a new discount
router.post("/create-discount", validateDiscountCreation, createDiscount);

// Route for getting all discounts
router.get("/get-discounts", validateGetDiscounts, getDiscounts); // 3 possible type of responses

module.exports = router;
