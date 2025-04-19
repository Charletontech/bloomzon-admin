const express = require("express");

const {
  addPlan,
  editPlan,
  removePlan,
  getPlan,
  getOnePlan,
} = require("../controllers/plan");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddPlanObj,
  validateGetPlanObj,
  validateUpdatePlanObj,
  validateRemovePlanObj,
} = require("../validators/plan");


router.get("/", getPlan);
router.get("/one", validateGetPlanObj, getOnePlan);
router.post("/register", protect, verified, authorize("admin"), validateAddPlanObj, addPlan);
router.put("/update", protect, verified, authorize("admin"), validateUpdatePlanObj, editPlan);
router.delete("/remove", protect, verified, authorize("admin"), validateRemovePlanObj, removePlan);

module.exports = router;