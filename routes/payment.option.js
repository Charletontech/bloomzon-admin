const express = require("express");

const {
  addPaymentOption,
  editPaymentOption,
  removePaymentOption,
  getPaymentOption,
  getOnePaymentOption,
  editPaymentOptionAdmin,
  getUserPaymentOption,
  getMyPaymentOption
} = require("../controllers/payment.option");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddPaymentOptionObj,
  validateGetPaymentOptionObj,
  validateUpdatePaymentOptionObj,
  validateRemovePaymentOptionObj,
  validateEditPaymentOptionAdminObj,
  validateGetUserPaymentOptionObj,
} = require("../validators/payment.option");


router.get("/", protect, verified, authorize("admin"), getPaymentOption);
router.get("/user", protect, verified, authorize("admin"), validateGetUserPaymentOptionObj, getUserPaymentOption);
router.get("/one", protect, verified, validateGetPaymentOptionObj, getOnePaymentOption);
router.get("/me", protect, verified, getMyPaymentOption);
router.post("/register", protect, verified, validateAddPaymentOptionObj, addPaymentOption);
router.put("/update", protect, verified, authorize("admin"), validateUpdatePaymentOptionObj, editPaymentOption);
router.put("/admin", protect, verified, authorize("admin"), validateEditPaymentOptionAdminObj, editPaymentOptionAdmin);
router.delete("/remove", protect, verified, validateRemovePaymentOptionObj, removePaymentOption);

module.exports = router;