const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");
const {getVerificationToken} = require("../../utils/auth");
const sendEmail = require("../../utils/sendEmail");
const sendPhone = require("../../utils/sendPhone");
const { Op } =  require('@sequelize/core');

const forgotPassword = async (req) => {
    const query = req.body.data
    const user = await User.findOne({
        where: {
            [Op.or]: [{email: query}, {phone: query}]
        }
    });
    if (!user) {
        throw new ErrorResponse("Invalid user", 400);
    }

    const verificationToken = await getVerificationToken();

    await user.update({
        verificationToken: verificationToken.token,
        verificationTokenExpire: verificationToken.expires,
    })


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

  // find: PHONE_TEMPLATE
  const messagePhone = `Dear ${user.firstname || "esteemed user"}, \n
  Welcome to Bloomzon. Your OTP: \n
  ${verificationToken.tokenCode}`;

  
  await sendPhone({
    phone: user.phone,
    subject: "Verification Token",
    body: messagePhone,
  });
  // console.log(verificationToken.tokenCode)
};

module.exports = forgotPassword;