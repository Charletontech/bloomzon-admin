const express = require("express");

const {
  addBusinessProductSubCategory,
  editBusinessProductSubCategory,
  removeBusinessProductSubCategory,
  getBusinessProductSubCategory,
  getOneBusinessProductSubCategory,
  getBusinessProductSubCategoryByCategory,
} = require("../controllers/product.subcategory");


const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddBusinessProductSubCategoryObj,
  validateGetBusinessProductSubCategoryObj,
  validateUpdateBusinessProductSubCategoryObj,
  validateRemoveBusinessProductSubCategoryObj,
} = require("../validators/product.subcategory");
const { validateGetBusinessProductCategoryObj } = require("../validators/product.category");


router.get("/",
    protect, verified,
    getBusinessProductSubCategory
);
router.get("/one", 
    protect, verified, validateGetBusinessProductSubCategoryObj,
    getOneBusinessProductSubCategory
);

router.get("/category", 
  protect, verified, validateGetBusinessProductCategoryObj,
  getBusinessProductSubCategoryByCategory
);

router.post("/register",
    protect, verified, authorize("admin"), validateAddBusinessProductSubCategoryObj,
    addBusinessProductSubCategory
);
router.put("/update",
    protect, verified, authorize("admin"), validateUpdateBusinessProductSubCategoryObj,
    editBusinessProductSubCategory
);
router.delete("/remove",
    protect, verified, authorize("admin"), validateRemoveBusinessProductSubCategoryObj,
    removeBusinessProductSubCategory
);

module.exports = router;