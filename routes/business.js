const express = require("express");

const {
  addBusiness,
  editBusiness,
  removeBusiness,
  getBusiness,
  getOneBusiness,
} = require("../controllers/business");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddBusinessObj,
  validateGetBusinessObj,
  validateUpdateBusinessObj,
  validateRemoveBusinessObj,
} = require("../validators/business");


router.get("/",
    protect, verified,
    getBusiness
);
router.get("/one", 
    protect, verified, validateGetBusinessObj,
    getOneBusiness
);
router.post("/register",
    protect, verified, authorize("admin"), validateAddBusinessObj,
    addBusiness
);
router.put("/update",
    protect, verified, authorize("admin"), validateUpdateBusinessObj,
    editBusiness
);
router.delete("/remove",
    protect, verified, authorize("admin"), validateRemoveBusinessObj,
    removeBusiness
);

module.exports = router;