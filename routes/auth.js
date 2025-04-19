const express = require("express");

const {
  register,
  verifyUser,
  resendOTP,
  addPhone,
  verifyUserPhone,
  resendPhoneOTP,
  login,
  login2FA,
  getMe,
  askForChangePassword,
  changePassword,
  forgotPassword,
  validateToken,
  resetPassword,
  addTransactionPin,
  initateResetTransactionPin,
  resetTransactionPin,
  changeTransactionPin,
} = require("../controllers/auth");

const {
  addReferal,
  getReferalDetails,
  referalHistory,
} = require("../controllers/referral");

const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
  validateActionToken
} = require("../middleware/auth");

const { multerUploads } = require("../middleware/multer");

const {
  validateRegisterObj,
  validateVerifyObj,
  validateResendOTPObj,
  validateAddPhoneObj,
  validateLoginObj,
  validatePasswordObj,
  validateForgotPasswordObj,
  validateResetPasswordObj,
  validateReferralObj,
  validateReferralGetObj,
  validateAddPinObj,
  validateChangePinObj,
  validateResetPinObj,
  validateLogin2FAObj,
} = require("../validators/auth");


router.post("/register", validateRegisterObj, register);
router.post("/verify", validateVerifyObj, verifyUser);
router.post("/resend-verify", validateResendOTPObj, resendOTP);
router.post("/phone", validateAddPhoneObj, addPhone);
router.post("/phone-verify", validateVerifyObj, verifyUserPhone);
router.post("/phone-resend-verify", validateResendOTPObj, resendPhoneOTP);
router.post("/login", validateLoginObj, login);
router.post("/login-2fa", validateLogin2FAObj, login2FA);
router.get("/me", protect, getMe);
router.get("/change-password", protect, askForChangePassword);
router.put("/password", validatePasswordObj, protect, changePassword);
router.post("/password-forgot", validateForgotPasswordObj, forgotPassword);
router.post("/validate-token", validateVerifyObj, validateToken);
router.put("/password-reset", validateResetPasswordObj, resetPassword);
router.post("/referal", validateReferralObj, protect, addReferal);
router.get("/referal/history", protect, verified, referalHistory);
router.get("/referal", validateReferralGetObj, getReferalDetails);
router.post(
  "/settings/add-pin",
  validateAddPinObj,
  protect,
  verifyPassword,
  addTransactionPin
);
router.post(
  "/settings/initiate-pin-reset",
  protect,
  verifyPassword,
  initateResetTransactionPin
);
router.post(
  "/settings/reset-pin",
  validateResetPinObj,
  protect,
  validateActionToken,
  resetTransactionPin
);

router.post(
  "/settings/change-pin",
  protect,
  verifyPassword,
  validateChangePinObj,
  changeTransactionPin
);


module.exports = router;