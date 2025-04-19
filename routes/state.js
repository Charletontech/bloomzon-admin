const express = require("express");

const {
  getState,
  getOneState,
  addState,
  editState,
  removeState,
  getCountryState,
} = require("../controllers/state");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateGetStateObj,
  validateAddStateObj,
  validateUpdateStateObj,
  validateRemoveStateObj,
} = require("../validators/state");

const { multerUploads } = require("../middleware/multer");

router.get("", getState);
router.get("/one",validateGetStateObj, getOneState);
router.get("/country", getCountryState);
router.post("/register", multerUploads.array("images"), protect, verified, authorize("admin"), validateAddStateObj, addState);
router.put("/update", multerUploads.array("images"), protect, verified, authorize("admin"), validateUpdateStateObj, editState);
router.delete("/remove", protect, verified, authorize("admin"), validateRemoveStateObj, removeState);


module.exports = router;