const express = require("express");

const {
  addShippingPickup,
  editShippingPickup,
  removeShippingPickup,
  getShippingPickup,
  getOneShippingPickup,
  getMyShippingPickup,
  getUserShippingPickup,
  editShippingPickupTiming,
  editShippingPickupPackage
} = require("../controllers/shipping.pickup");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddShippingPickupObj,
  validateGetShippingPickupObj,
  validateUpdateShippingPickupObj,
  validateRemoveShippingPickupObj,
  validateGetUserShippingPickupObj,
  validateTimingShippingPickupObj,
  validatePackageShippingPickupObj
} = require("../validators/shipping.pickup");


router.get("/", protect, verified, authorize("admin"), getShippingPickup);
router.get("/one", protect, verified, validateGetShippingPickupObj, getOneShippingPickup);
router.get("/me", protect, verified, getMyShippingPickup);
router.get("/user", protect, verified, authorize("admin"), validateGetUserShippingPickupObj, getUserShippingPickup);
router.post("/register", protect, verified, authorize("seller"), validateAddShippingPickupObj, addShippingPickup);
router.put("/update", protect, verified, authorize("seller"), validateUpdateShippingPickupObj, editShippingPickup);
router.put("/timing", protect, verified, authorize("seller"), validateTimingShippingPickupObj, editShippingPickupTiming);
router.put("/package", protect, verified, authorize("seller"), validatePackageShippingPickupObj, editShippingPickupPackage);
router.delete("/remove", protect, verified, authorize("admin"), validateRemoveShippingPickupObj, removeShippingPickup);

module.exports = router;