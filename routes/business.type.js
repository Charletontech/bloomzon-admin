const express = require("express");

const {
  addBusinessType,
  editBusinessType,
  removeBusinessType,
  getBusinessType,
  getOneBusinessType,
} = require("../controllers/business.type");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddBusinessTypeObj,
  validateGetBusinessTypeObj,
  validateUpdateBusinessTypeObj,
  validateRemoveBusinessTypeObj,
} = require("../validators/business.type");


router.get("/",
    protect, verified,
    getBusinessType
);
router.get("/one", 
    protect, verified, validateGetBusinessTypeObj,
    getOneBusinessType
);
router.post("/register",
    protect, verified, authorize("admin"), validateAddBusinessTypeObj,
    addBusinessType
);
router.put("/update",
    protect, verified, authorize("admin"), validateUpdateBusinessTypeObj,
    editBusinessType
);
router.delete("/remove",
    protect, verified, authorize("admin"), validateRemoveBusinessTypeObj,
    removeBusinessType
);

module.exports = router;