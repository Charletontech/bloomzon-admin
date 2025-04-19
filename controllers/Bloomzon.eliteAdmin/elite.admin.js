const asyncHandler = require("../../middleware/async");
const eliteMembership = require("../../services/Bloomzon.eliteAdmin/eliteMembership");
const manageSubscription = require("../../services/Bloomzon.eliteAdmin/manageSubscription");
const {
  createDiscount,
  getDiscounts,
} = require("../../services/Bloomzon.eliteAdmin/discount.service");

exports.eliteMembership = asyncHandler(async (req, res, next) => {
  const responseObj = await eliteMembership(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});

exports.manageSubscription = asyncHandler(async (req, res, next) => {
  const responseObj = await manageSubscription(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});

// Controller for creating a new discount
exports.createDiscount = asyncHandler(async (req, res, next) => {
  const discount = await createDiscount(req, next);
  const responseObj = {
    success: true,
    data: discount,
  };
  res.status(201).json(responseObj);
});

// Controller for getting all discounts
exports.getDiscounts = asyncHandler(async (req, res, next) => {
  const discounts = await getDiscounts(req, next);
  const responseObj = {
    success: true,
    data: discounts,
  };
  res.status(200).json(responseObj);
});
