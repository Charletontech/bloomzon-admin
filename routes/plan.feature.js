const express = require("express");

const {
  addPlanFeature,
  editPlanFeature,
  removePlanFeature,
  getPlanFeature,
  getOnePlanFeature,
} = require("../controllers/plan.feature");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddPlanFeatureObj,
  validateGetPlanFeatureObj,
  validateUpdatePlanFeatureObj,
  validateRemovePlanFeatureObj,
} = require("../validators/plan.feature");


router.get("/", getPlanFeature);
router.get("/one", validateGetPlanFeatureObj, getOnePlanFeature);
router.post("/register", protect, verified, authorize("admin"), validateAddPlanFeatureObj, addPlanFeature);
router.put("/update", protect, verified, authorize("admin"), validateUpdatePlanFeatureObj, editPlanFeature);
router.delete("/remove", protect, verified, authorize("admin"), validateRemovePlanFeatureObj, removePlanFeature);

module.exports = router;