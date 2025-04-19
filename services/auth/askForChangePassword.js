const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");
const { getVerificationToken } = require("../../utils/auth");
const sendEmail = require("../../utils/sendEmail");

const askForChangePassword = async (req) => {
  const user = await User.findByPk(req.user.id);

  let isVerified = false;
  const verificationToken = await getVerificationToken();

  user.update({
    isVerified,
    verificationToken: verificationToken.token,
    verificationTokenExpire: verificationToken.expires,
  })


  // find: EMAIL_TEMPLATE
  const message = `Dear ${user.firstname || "esteemed user"}, \n
  Welcome to Bloomzon. Use the number below to complete your password change verification process \n
  ${verificationToken.tokenCode}\n
  If you didn't initiate this action, kindly ignore this mail.`;


  await sendEmail({
    email: user.email,
    subject: "Password Change Request",
    body: message,
  });

  return user;
};

module.exports = askForChangePassword;
