const express = require("express");

const {
  getCity,
  getOneCity,
  addCity,
  editCity,
  removeCity,
  getStateCity,
} = require("../controllers/city");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateGetCityObj,
  validateAddCityObj,
  validateUpdateCityObj,
  validateRemoveCityObj,
} = require("../validators/city");

const { multerUploads } = require("../middleware/multer");

router.get("", getCity);
router.get("/one",validateGetCityObj, getOneCity);
router.post("/register", multerUploads.array("images"), protect, verified, authorize("admin"), validateAddCityObj, addCity);
router.put("/update", multerUploads.array("images"), protect, verified, authorize("admin"), validateUpdateCityObj, editCity);
router.delete("/remove", protect, verified, authorize("admin"), validateRemoveCityObj, removeCity);
router.get("/state", getStateCity);


module.exports = router;