const express = require("express");

const {
    getEditStore,
    getEditStoreStatus,
    addStore,
    addReturnPolicy,
    addDefaultReturnAddress,
    addStoreDays,
    addShippingDetails,
    addStoreTax,
    addStoreTaxConfirmation,
    addStoreReturnResolution,
    editStoreReturnResolution,
    deleteStoreReturnResolution,
    editStoreReturnResolutionDefault,
    addAppSetting,
    addChangeName,
    addRequestChangeEmail,
    addChangeEmail,
    addRequestToken,
    addChangePhone,
    addRequestChangePhone,
    addChangePassword,
    addVerificationMethod
} = require("../controllers/seller.business.settings");

const { multerUploads } = require("../middleware/multer");

const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateGetEditStoresObj,
  validateGetEditStoreStatusObj,
  validateAddStoreObj,
  validateAddReturnPolicyObj,
  validateAddDefaultReturnAddressObj,
  validateAddStoreDaysObj,
  validateAddShippingDetailsObj,
  validateAddStoreTaxObj,
  validateAddStoreTaxConfirmationObj,
  validateAddStoreReturnResolutionObj,
  validateEditStoreReturnResolutionObj,
  validateRemoveStoreReturnResolutionObj,
  validateEditStoreReturnResolutionDefaultObj,
  validateAddAppSettingObj,
  validateChangeNameObj,
  validateAddChangeEmailObj,
  validateAddRequestChangeEmailObj,
  validateAddRequestChangePhoneObj,
  validateAddChangePhoneObj,
  validateAddChangePasswordObj,
  validateAddVerificationMethodObj
} = require("../validators/seller.business.settings");


router.put("/edit-marketplace", protect, verified, authorize("seller"), validateGetEditStoresObj, getEditStore);
router.put("/edit-marketplace-status", protect, verified, authorize("seller"), validateGetEditStoreStatusObj, getEditStoreStatus);
router.put("/add-marketplace", protect, verified, authorize("seller"), validateAddStoreObj, addStore);
router.put("/add-marketplace-return-policy", protect, verified, authorize("seller"), validateAddReturnPolicyObj, addReturnPolicy);
router.put("/add-marketplace-return-default-address", protect, verified, authorize("seller"), validateAddDefaultReturnAddressObj, addDefaultReturnAddress);
router.put("/add-marketplace-days", protect, verified, authorize("seller"), validateAddStoreDaysObj, addStoreDays);
router.put("/add-marketplace-shipping", protect, verified, authorize("seller"), validateAddShippingDetailsObj, addShippingDetails);
router.put("/add-marketplace-tax", protect, verified, authorize("seller"), validateAddStoreTaxObj, addStoreTax);
router.put("/add-marketplace-confirm", protect, verified, authorize("seller"), validateAddStoreTaxConfirmationObj, addStoreTaxConfirmation);
router.post("/add-marketplace-resolution", protect, verified, authorize("seller"), validateAddStoreReturnResolutionObj, addStoreReturnResolution);
router.put("/edit-marketplace-resolution", protect, verified, authorize("seller"), validateEditStoreReturnResolutionObj, editStoreReturnResolution);
router.delete("/delete-marketplace-resolution", protect, verified, authorize("seller"), validateRemoveStoreReturnResolutionObj, deleteStoreReturnResolution);
router.put("/edit-marketplace-resolution-default", protect, verified, authorize("seller"), validateEditStoreReturnResolutionDefaultObj, editStoreReturnResolutionDefault);
router.put("/app-settings", protect, verified, authorize("seller"), validateAddAppSettingObj, addAppSetting);
router.put("/change-name", protect, verified, validateChangeNameObj, addChangeName);
router.get("/resend-token", protect, verified, addRequestToken);
router.put("/request-change-email", protect, verified, validateAddRequestChangeEmailObj, addRequestChangeEmail);
router.put("/change-email", protect, verified, validateAddChangeEmailObj, addChangeEmail);
router.put("/request-change-phone", protect, verified, validateAddRequestChangePhoneObj, addRequestChangePhone);
router.put("/change-phone", protect, verified, validateAddChangePhoneObj, addChangePhone);
router.put("/change-password", protect, verified, validateAddChangePasswordObj, addChangePassword);
router.put("/change-verification-method", protect, verified, validateAddVerificationMethodObj, addVerificationMethod);

module.exports = router;