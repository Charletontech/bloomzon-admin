const ErrorResponse = require("../../utils/errorResponse");
const { Notification, User} = require("../../models");

const { getVerificationToken } = require("../../utils/auth");
const sendPhone = require("../../utils/sendPhone");


const addRequestChangePhone = async (req) => {
    try {

        const verificationToken = await getVerificationToken();

        const checks = await  User.findByPk(req.user.id)
        if(!checks){
            throw new ErrorResponse(`The user ${req.user.id} was not found`,  401 );
        }

        const result = checks.update({
            verificationToken: verificationToken.token,
            verificationTokenExpire: verificationToken.expires,
            changePhone: req.body.phone,
        });


        // find: EMAIL_TEMPLATE
        const message = `Dear ${checks.firstname || "esteemed user"}, \n
        Welcome to Bloomzon. Use the number below to complete your phone change verification process \n
        ${verificationToken.tokenCode}\n
        If you didn't initiate this action, kindly ignore this mail.`;


        await sendPhone({
            phone: checks.phone,
            subject: "Verification Token",
            body: message,
          });

        console.log(verificationToken.tokenCode)


        await Notification.create({
            UserId: req.user.id,
            message: `Your account email change request has been sent`,
            category: "settings",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addRequestChangePhone;