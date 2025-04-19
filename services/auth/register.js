const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");
const sendEmail = require("../../utils/sendEmail");
let referralCodeGenerator = require("referral-code-generator");
const emailValidity = require("../../validators/auth/emailValidity");
const {getVerificationToken, jwtSign, pwd} = require("../../utils/auth");
const speakeasy = require('speakeasy');

const register = async (req) => {
  let {
    email,
    firstname,
    lastname,
    password,
    role,
    referredBy,
    phone
  } = req.body;
  const isEmailDomainValid = await emailValidity(
    email,
    role ? role : "guest"
  );

  if (role && role === "admin") {
    throw new ErrorResponse("Operation not permitted");
  }

  if (!isEmailDomainValid)
    throw new ErrorResponse(
      "Unsupported email domain, refer to the tooltip for more information, or contact support.",
      400
    );

  let isVerified = false;
  let referralCode = referralCodeGenerator.custom("lowercase", 6, 3, email);


  const referral = await  User.findOne({
      where: [{
        referralCode : referredBy?referredBy:''
      }]
  })
  
  const checkUser = await User.findOne({
      where: [{
        email : email?.toLowerCase()
      }]
  })
  if(checkUser){
      throw new ErrorResponse(`The user ${req.body.email} already exist`,  401 );
  }

  if (referral && referredBy) {
    referredBy = referredBy?.toLowerCase();
  }
  const verificationToken = await getVerificationToken();
  
  const secret = speakeasy.generateSecret();
  // Create user
  const user = await User.create({
    firstname,
    lastname,
    email: email?.toLowerCase(),
    password: await pwd(password),
    isVerified,
    referralCode,
    referredBy: referredBy?.toLowerCase(),
    role,
    roles: ['0'],
    verificationToken: verificationToken.token,
    verificationTokenExpire: verificationToken.expires,
    phone,
    secretAscii: secret.ascii,
    secretHex: secret.hex,
    secretBase32: secret.base32,
    secretPathUrl: secret.otpauth_url,
    adminLocked: false
  });
  const token = await jwtSign(user.id);

  // find: EMAIL_TEMPLATE
  const message = `Dear ${user.firstname || "esteemed user"}, \n
  Welcome to Bloomzon. Use the number below to complete your verification process \n
  ${verificationToken.tokenCode}\n
  If you didn't initiate this action, kindly ignore this mail.`;



  await sendEmail({
    email: user.email,
    subject: "Verification Token",
    body: message,
  });

  return {
    success: true,
    message: `Enter Verification code sent to ${user.email} to continue registration`,
    token
  };
};

module.exports = register;
