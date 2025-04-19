const express = require("express");

const {
    addSPISellerBusiness,
    addIVSellerBusiness,
    addAVSellerBusiness,
    addBASellerBusiness,
    addSISellerBusiness,
    addSMSellerBusiness,
    addUploadFrontIVSellerBusiness,
    addUploadBackIVSellerBusiness,
    addUploadAVSellerBusiness,
    removeSellerBusiness,
    getSellerBusiness,
    getOneSellerBusiness,
    getEditSellerBusiness,
} = require("../controllers/seller.business");

const { multerUploads } = require("../middleware/multer");

const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateAddSPISellerBusinessObj,
  validateAddIVSellerBusinessObj,
  validateAddAVSellerBusinessObj,
  validateAddBASellerBusinessObj,
  validateAddSISellerBusinessObj,
  validateAddSMSellerBusinessObj,
  validateAddUploadFrontIVSellerBusinessObj,
  validateAddUploadBackIVSellerBusinessObj,
  validateAddUploadAVSellerBusinessObj,
  validateRemoveSellerBusinessObj,
  validateGetOneSellerBusinessObj,
  validateGetEditSellerBusinessObj,
} = require("../validators/seller.business");


router.post("/personal-information", protect, verified, authorize("seller"), validateAddSPISellerBusinessObj, addSPISellerBusiness);
router.put("/identity-verification", protect, verified, authorize("seller"), validateAddIVSellerBusinessObj, addIVSellerBusiness);
router.put("/address-verification", protect, verified, authorize("seller"), validateAddAVSellerBusinessObj, addAVSellerBusiness);
router.put("/billing-address", protect, verified, authorize("seller"), validateAddBASellerBusinessObj, addBASellerBusiness);
router.put("/store-information", protect, verified, authorize("seller"), validateAddSISellerBusinessObj, addSISellerBusiness);
router.put("/shipping-method", protect, verified, authorize("seller"), validateAddSMSellerBusinessObj, addSMSellerBusiness);
router.post("/upload-id-front", 
  multerUploads.single("image"),
  validateAddUploadFrontIVSellerBusinessObj,
  protect, verified, authorize("seller"),
 addUploadFrontIVSellerBusiness
);
router.post("/upload-id-back", 
  multerUploads.single("image"), 
  validateAddUploadBackIVSellerBusinessObj,
  protect, verified, authorize("seller"), 
  addUploadBackIVSellerBusiness
);
router.post("/upload-av", 
  multerUploads.single("image"),
  validateAddUploadAVSellerBusinessObj,
  protect, verified, authorize("seller"),
  addUploadAVSellerBusiness
);
router.get("/", protect, verified, getSellerBusiness);
router.get("/one", protect, verified, validateGetOneSellerBusinessObj, getOneSellerBusiness)
router.put("/update", protect, verified, authorize("admin"), validateGetEditSellerBusinessObj, getEditSellerBusiness);
router.delete("/remove", protect, verified, authorize("admin"), validateRemoveSellerBusinessObj, removeSellerBusiness);

module.exports = router;