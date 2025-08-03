const asyncHandler = require("../../middleware/async");
const {
  sellersSummaryDataService,
  getReelUsersService,
  searchReelUsersService,
  createReelSaleService,
  getTopReelsService,
  getDailySalesSummaryService,
  upSellRevenueService,
  sellerFeeBreakdownService,
  analyticsOverviewDataService,
} = require("../../services/reelsAdmin");
const ErrorResponse = require("../../utils/errorResponse");

exports.sellersSummaryData = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await sellersSummaryDataService(req, next);
    res.status(200).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getReelUsers = asyncHandler(async (req, res, next) => {
  const result = await getReelUsersService(req);
  res.status(200).json({
    success: true,
    ...result,
  });
});

exports.searchReelUsers = async (req, res, next) => {
  try {
    const result = await searchReelUsersService(req, next);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

exports.createReelSale = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await createReelSaleService(req, next);
    res.status(201).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getTopReels = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getTopReelsService(req, next);
    res.status(201).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getDailySalesSummary = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getDailySalesSummaryService(req, next);
    res.status(201).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.upSellRevenue = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await upSellRevenueService();
    res.status(201).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.sellerFeeBreakdown = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await sellerFeeBreakdownService();
    res.status(201).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.analyticsOverviewData = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await analyticsOverviewDataService();
    res.status(201).json({
      success: true,
      data: responseObj,
    });
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});
