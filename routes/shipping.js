const express = require("express");

const {
  addShipping,
  editShipping,
  removeShipping,
  getShipping,
  getOneShipping,
} = require("../controllers/shipping");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddShippingObj,
  validateGetShippingObj,
  validateUpdateShippingObj,
  validateRemoveShippingObj,
} = require("../validators/shipping");


router.get("/", protect, getShipping);
router.get("/one", protect, validateGetShippingObj, getOneShipping);
router.post("/register", protect, verified, authorize("admin"), validateAddShippingObj, addShipping);
router.put("/update", protect, verified, authorize("admin"), validateUpdateShippingObj, editShipping);
router.delete("/remove", protect, verified, authorize("admin"), validateRemoveShippingObj, removeShipping);

module.exports = router;