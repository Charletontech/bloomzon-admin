const validateDiscountCreation = require("./validateDiscountCreation");
const validateEliteMembership = require("./validateEliteMembership");
const validateGetDiscounts = require("./validateGetDiscounts");
const validateManageSubscription = require("./validateManageSubscription");

module.exports = {
  validateEliteMembership,
  validateManageSubscription,
  validateDiscountCreation,
  validateGetDiscounts,
};
