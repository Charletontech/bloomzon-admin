const asyncHandler = require("../middleware/async");

const {
  addPlanFeature,
  editPlanFeature,
  removePlanFeature,
  getPlanFeature,
  getOnePlanFeature,
} = require("../services/plan.feature");

exports.addPlanFeature = asyncHandler(async (req, res, next) => {
  const responseObj = await addPlanFeature(req);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(201).json(prepare);
});

exports.editPlanFeature = asyncHandler(async (req, res, next) => {
  const responseObj = await editPlanFeature(req);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});

exports.removePlanFeature = asyncHandler(async (req, res, next) => {
  const responseObj = await removePlanFeature(req);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});

exports.getPlanFeature = asyncHandler(async (req, res, next) => {
  const responseObj = await getPlanFeature(req);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});

exports.getOnePlanFeature = asyncHandler(async (req, res, next) => {
  const responseObj = await getOnePlanFeature(req);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});
