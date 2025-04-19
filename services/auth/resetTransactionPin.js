const {User} = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");
const getToken = require("../../utils/getToken");
const sendEmail = require("../../utils/sendEmail");
const bcrypt = require("bcryptjs");


const initateResetTransactionPin = async (req) => {
  const user = await User.findByPk(req.user?.id);

  const {token, tokenHash, tokenHashExpire} = await getToken();

  await user.update({
    appActionToken: tokenHash,
    appActionTokenExpire: tokenHashExpire,
  });

  // find: EMAIL_TEMPLATE
  const message = `Dear ${user.firstname || "esteemed user"}, \n
 Please use the code below to complete your action \n
  ${token}\n
  If you didn't initiate this action, kindly ignore this mail.`;

  await sendEmail({
    email: user.email,
    subject: "Pin reset Token",
    body: message,
  });

  return {
    success: true,
    message: `Enter Verification code sent to ${user.email} to reset PIN`,
  };
};


const resetTransactionPin = async (req) => {
  const user = await User.findByPk(req.user.id);

  const salt = await bcrypt.genSalt(10);

  const hashedPin = bcrypt.hashSync(req.body.pin, salt);

  await user.update({
    pin: hashedPin,
    pin_attempts: 0,
    isPinLockedOut: false
  });
};

module.exports = { resetTransactionPin, initateResetTransactionPin };
