const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");
const {getVerificationToken} = require("../../utils/auth");
const sendPhone = require("../../utils/sendPhone");

const resendPhoneOTP = async (req) => {
  
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


  // find: PHONE_TEMPLATE
  const message = `Dear ${user.firstname || "esteemed user"}, \n
  Welcome to Bloomzon. Your OTP: \n
  ${verificationToken.tokenCode}`;
  // console.log(verificationToken.tokenCode)


  await sendPhone({
    phone: user.phone,
    subject: "Verification Token",
    body: message,
  });
};

module.exports = resendPhoneOTP;