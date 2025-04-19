const express = require("express");

const {
  addSellerPlan,
  removeSellerPlan,
  getSellerPlan,
  getOneSellerPlan,
  getUserSellerPlan,
} = require("../controllers/seller.plan");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddSellerPlanObj,
  validateGetSellerPlanObj,
  validateRemoveSellerPlanObj,
  validateGetASellerPlanObj,
} = require("../validators/seller.plan");


router.get("/", getSellerPlan);
router.get("/one", validateGetSellerPlanObj, getOneSellerPlan);
router.get("/user", protect, verified, authorize("admin", "seller"), validateGetASellerPlanObj, getUserSellerPlan);
router.post("/register", protect, verified, authorize("admin", "seller"), validateAddSellerPlanObj, addSellerPlan);
router.delete("/remove", protect, verified, authorize("admin", "seller"), validateRemoveSellerPlanObj, removeSellerPlan);

module.exports = router;