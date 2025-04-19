const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");
const {getVerificationToken} = require("../../utils/auth");
const sendEmail = require("../../utils/sendEmail");

const resendOTP = async (req) => {
  
  const user = await User.findOne({
    where: {
      email: req.body.email,
    }
  });
  if (!user) {
    throw new ErrorResponse("Invalid user", 400);
  }

  let isVerified = false;
  const verificationToken = await getVerificationToken();

  await user.update({
    isVerified,
    verificationToken: verificationToken.token,
    verificationTokenExpire: verificationToken.expires,
  })


  // find: EMAIL_TEMPLATE
  const message = `Dear ${user.firstname || "esteemed user"}, \n
  Welcome to Bloomzon. Use the number below to complete your verification process \n
  ${verificationToken.tokenCode}\n
  If you didn't initiate this action, kindly ignore this mail.`;

  // console.log(verificationToken.tokenCode)

  await sendEmail({
    email: user.email,
    subject: "Verification Token",
    body: message,
  });
};

module.exports = resendOTP;