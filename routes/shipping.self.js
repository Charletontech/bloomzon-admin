const express = require("express");

const {
  addShippingSelf,
  editShippingSelf,
  removeShippingSelf,
  getShippingSelf,
  getOneShippingSelf,
  getMyShippingSelf,
  getUserShippingSelf
} = require("../controllers/shipping.self");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddShippingSelfObj,
  validateGetShippingSelfObj,
  validateUpdateShippingSelfObj,
  validateRemoveShippingSelfObj,
  validateGetUserShippingSelfObj
} = require("../validators/shipping.self");


router.get("/", protect, verified, authorize("admin"), getShippingSelf);
router.get("/one", protect, verified, validateGetShippingSelfObj, getOneShippingSelf);
router.get("/me", protect, verified, getMyShippingSelf);
router.get("/user", protect, verified, authorize("admin"), validateGetUserShippingSelfObj, getUserShippingSelf);
router.post("/register", protect, verified, authorize("seller"), validateAddShippingSelfObj, addShippingSelf);
router.put("/update", protect, verified, authorize("seller"), validateUpdateShippingSelfObj, editShippingSelf);
router.delete("/remove", protect, verified, authorize("admin"), validateRemoveShippingSelfObj, removeShippingSelf);

module.exports = router;