const validateFeedbackStatusUpdate = require("./updateStatusSchema");
const validateDiscountCreation = require("./validateDiscountCreation");
const validateDiscountUpdate = require("./validateDiscountUpdate");
const validateEliteFeedback = require("./validateEliteFeedback");
const validateEliteMembership = require("./validateEliteMembership");
const validateGetDiscounts = require("./validateGetDiscounts");
const validateManageSubscription = require("./validateManageSubscription");

module.exports = {
  validateEliteMembership,
  validateManageSubscription,
  validateDiscountCreation,
  validateGetDiscounts,
  validateFeedbackStatusUpdate,
  validateEliteFeedback,
  validateDiscountUpdate,
};
