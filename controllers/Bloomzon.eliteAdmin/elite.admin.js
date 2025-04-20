const asyncHandler = require("../../middleware/async");
const eliteMembership = require("../../services/Bloomzon.eliteAdmin/eliteMembership");
const manageSubscription = require("../../services/Bloomzon.eliteAdmin/manageSubscription");
const {
  createDiscount,
  getDiscounts,
} = require("../../services/Bloomzon.eliteAdmin/discount.service");
const submitEliteFeedback = require("../../services/Bloomzon.eliteAdmin/eliteFeedback");
const getEliteFeedback = require("../../services/Bloomzon.eliteAdmin/getEliteFeedback");
const updateEliteFeedbackStatus = require("../../services/Bloomzon.eliteAdmin/updateEliteFeedbackStatus");
const getDashboardAnalytics = require("../../services/Bloomzon.eliteAdmin/dashboardAnalytics");
const updateDiscount = require("../../services/Bloomzon.eliteAdmin/updateDiscount");
const getAllEliteMembers = require("../../services/Bloomzon.eliteAdmin/getAllEliteMembers");

exports.eliteMembership = asyncHandler(async (req, res, next) => {
  const responseObj = await eliteMembership(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});

exports.getAllEliteMembers = asyncHandler(async (req, res, next) => {
  const members = await getAllEliteMembers(next);
  res.status(200).json({ success: true, data: members });
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

// Controller for editing discount
exports.updateDiscount = asyncHandler(async (req, res, next) => {
  const updatedDiscount = await updateDiscount(req, next);
  res.status(200).json({
    success: true,
    data: updatedDiscount,
  });
});

// controllers for feedbacks
exports.submitEliteFeedback = asyncHandler(async (req, res, next) => {
  const result = await submitEliteFeedback(req, next);
  res.status(200).json({ success: true, data: result });
});

exports.getEliteFeedback = asyncHandler(async (req, res, next) => {
  const result = await getEliteFeedback(req, next);
  res.status(200).json({ success: true, data: result });
});

exports.updateEliteFeedbackStatus = asyncHandler(async (req, res, next) => {
  const result = await updateEliteFeedbackStatus(req, next);
  res.status(200).json({ success: true, data: result });
});

// controllers for analytics
exports.getDashboardAnalytics = asyncHandler(async (req, res, next) => {
  const data = await getDashboardAnalytics(req, next);
  res.status(200).json({
    success: true,
    data,
  });
});
