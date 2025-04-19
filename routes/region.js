const express = require("express");

const {
  addRegion,
  editRegion,
  removeRegion,
  getRegion,
  getOneRegion,
} = require("../controllers/region");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddRegionObj,
  validateGetRegionObj,
  validateUpdateRegionObj,
  validateRemoveRegionObj,
} = require("../validators/region");


router.get("/", getRegion);
router.get("/one", validateGetRegionObj, getOneRegion);
router.post("/register", protect, verified, authorize("admin"), validateAddRegionObj, addRegion);
router.put("/update", protect, verified, authorize("admin"), validateUpdateRegionObj, editRegion);
router.delete("/remove", protect, verified, authorize("admin"), validateRemoveRegionObj, removeRegion);

module.exports = router;