const asyncHandler = require("../middleware/async");

const {
    addReferal,
    getReferalDetails,
    referalHistory,
} = require("../services/referral");




exports.addReferal = asyncHandler(async (req, res, next) => {
    const responseObj = await addReferal(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.getReferalDetails = asyncHandler(async (req, res, next) => {
  const responseObj = await getReferalDetails(req);
  const prepare = {
      "success": true,
      "data": responseObj
  }
  res.status(201).json(prepare);
});

exports.referalHistory = asyncHandler(async (req, res, next) => {
  const responseObj = await referalHistory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

