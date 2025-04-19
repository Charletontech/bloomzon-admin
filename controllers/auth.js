
const asyncHandler = require("../middleware/async");
const jwt = require("jsonwebtoken");
const speakeasy = require('speakeasy');

const {
    login2FA,
    login,
    getMe,
    register,
    changePassword,
    askForChangePassword,
    verifyUser,
    resendOTP,
    addPhone,
    verifyUserPhone,
    resendPhoneOTP,
    forgotPassword,
    resetPassword,
    validateToken,
    addTransactionPin
} = require("../services/auth");

const {
  initateResetTransactionPin,
  resetTransactionPin,
} = require("../services/auth/resetTransactionPin");
const changeTransactionPin = require("../services/auth/changeTransactionPin");
const { verify2FA } = require("../utils/auth");

exports.register = asyncHandler(async (req, res, next) => {
    const responseObj = await register(req);
    res.status(201).json(responseObj);
});

exports.verifyUser = asyncHandler(async (req, res, next) => {
    await verifyUser(req);
    res.status(200).json({
      success: true,
      message: "Verification sucessfull",
    });
});

exports.resendOTP = asyncHandler(async (req, res, next) => {
    await resendOTP(req);
    res.status(200).json({
      success: true,
      message: "Verification Token sent",
    });
});

exports.addPhone = asyncHandler(async (req, res, next) => {
    await addPhone(req);
    res.status(200).json({
      success: true,
      message: "Phone number added",
    });
});

exports.resendPhoneOTP = asyncHandler(async (req, res, next) => {
  await resendPhoneOTP(req);
  res.status(200).json({
    success: true,
    message: "OTP sent to number",
  });
});

exports.verifyUserPhone = asyncHandler(async (req, res, next) => {
    await verifyUserPhone(req);
    res.status(200).json({
      success: true,
      message: "Verification sucessfull",
    });
});

const sendTokenResponse = (user, statusCode, res) => {
  const userId = user.id
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  res.status(statusCode).json({
    success: true,
    token,
  });
};

const get2FAResponse = (user, statusCode, res) => {
  const secretAscii = user.secretAscii;
  const secretHex = user.secretHex;
  const secretBase32 = user.secretBase32;
  const secretPathUrl = user.secretPathUrl;
  res.status(statusCode).json({
    success: true,
    message: "Link your 2 factor authenticatior app with bloomzon",
    ascii: secretAscii,
    hex: secretHex,
    base32: secretBase32,
    url: secretPathUrl,
  });
};

exports.login = asyncHandler(async (req, res, next) => {
    const user = await login(req);
    if (user.verificationMethod == 'authenticatorApp')
      get2FAResponse(user, 200, res)
    else
      sendTokenResponse(user, 200, res);
});

exports.login2FA = asyncHandler(async (req, res, next) => {
  const user = await login2FA(req);
  const userVerify2FA = await verify2FA(user?.secretBase32, 'base32', Number(req.body.token), 1)
  if(userVerify2FA === true)
    sendTokenResponse(user, 200, res)
  else
    res.status(404).json({
      success: false,
      message: "2 factor authentication has failed",
    });
});

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await getMe(req);
    res.status(200).json({
      success: true,
      data: user,
    });
});

exports.askForChangePassword = asyncHandler(async (req, res, next) => {
  await askForChangePassword(req);
    res.status(200).json({
      success: true,
      message: "Verification email sent",
    });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
    const user = await changePassword(req);
    sendTokenResponse(user, 200, res);
});


exports.forgotPassword = asyncHandler(async (req, res, next) => {
  await forgotPassword(req);
    res.status(200).json({
      success: true,
      message: "Verification email or SMS sent",
    });
});

exports.validateToken = asyncHandler(async (req, res, next) => {
  await validateToken(req);
    res.status(200).json({
      success: true,
      message: "Token Verification  Successful",
    });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  await resetPassword(req);
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
});

exports.addTransactionPin = asyncHandler(async (req, res) => {
  await addTransactionPin(req);

  res.status(201).json({
    success: true,
    message: "You have successfully set your transaction PIN",
  });
});

exports.initateResetTransactionPin = asyncHandler(async (req, res) => {
  const response = await initateResetTransactionPin(req);

  res.status(201).json(response);
});

exports.resetTransactionPin = asyncHandler(async (req, res) => {
  await resetTransactionPin(req);

  res.status(201).json({
    success: true,
    message:
      "Your PIN has been reset successfully, please keep your new PIN safe.",
  });
});

exports.changeTransactionPin = asyncHandler(async (req, res) => {
  await changeTransactionPin(req);

  res.status(201).json({
    success: true,
    message: "Your transaction PIN has been changed",
  });
});
