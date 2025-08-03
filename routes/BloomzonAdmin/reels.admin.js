const express = require("express");
const {
  sellersSummaryData,
  getReelUsers,
  searchReelUsers,
  createReelSale,
  getTopReels,
  getDailySalesSummary,
  upSellRevenue,
  sellerFeeBreakdown,
  analyticsOverviewData,
} = require("../../controllers/BloomzonAdmin/reels.admin");
const { validateSaleInput } = require("../../validators/reels");

const router = express.Router();

router.get("/reels-sellers-summary-data", sellersSummaryData);
router.get("/all-reel-users", getReelUsers);
router.get("/find-seller", searchReelUsers);
// move this back to reel
router.post("/create-reel-sale", validateSaleInput, createReelSale);
router.get("/top-performing", getTopReels);
router.get("/daily-reels-sales", getDailySalesSummary);
router.get("/upsell-revenue", upSellRevenue);
router.get("/seller-fee-breakdown", sellerFeeBreakdown);
router.get("/analytics-overview-data", analyticsOverviewData);

module.exports = router;
