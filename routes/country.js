const express = require("express");

const {
  getCountry,
  getOneCountry,
  addCountry,
  editCountry,
  removeCountry,
  getRegionCountry,
} = require("../controllers/country");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateGetCountryObj,
  validateAddCountryObj,
  validateUpdateCountryObj,
  validateRemoveCountryObj,
} = require("../validators/country");

const { multerUploads } = require("../middleware/multer");

router.get("", getCountry);
router.get("/one",validateGetCountryObj, getOneCountry);
router.post("/register", multerUploads.array("images"), protect, verified, authorize("admin"), validateAddCountryObj, addCountry);
router.put("/update", multerUploads.array("images"), protect, verified, authorize("admin"), validateUpdateCountryObj, editCountry);
router.delete("/remove", protect, verified, authorize("admin"), validateRemoveCountryObj, removeCountry);
router.get("/region", getRegionCountry);


module.exports = router;