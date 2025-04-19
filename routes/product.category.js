const express = require("express");

const {
  addBusinessProductCategory,
  editBusinessProductCategory,
  removeBusinessProductCategory,
  getBusinessProductCategory,
  getOneBusinessProductCategory,
  getBusinessProductCategoryByBusiness,
} = require("../controllers/product.category");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddBusinessProductCategoryObj,
  validateGetBusinessProductCategoryObj,
  validateUpdateBusinessProductCategoryObj,
  validateRemoveBusinessProductCategoryObj,
} = require("../validators/product.category");
const { validateGetBusinessObj } = require("../validators/business");


router.get("/",
    protect, verified,
    getBusinessProductCategory
);
router.get("/one", 
    protect, verified, validateGetBusinessProductCategoryObj,
    getOneBusinessProductCategory
);

router.get("/business", 
  protect, verified, validateGetBusinessObj,
  getBusinessProductCategoryByBusiness
);

router.post("/register",
    protect, verified, authorize("admin"), validateAddBusinessProductCategoryObj,
    addBusinessProductCategory
);
router.put("/update",
    protect, verified, authorize("admin"), validateUpdateBusinessProductCategoryObj,
    editBusinessProductCategory
);
router.delete("/remove",
    protect, verified, authorize("admin"), validateRemoveBusinessProductCategoryObj,
    removeBusinessProductCategory
);

module.exports = router;