const ErrorResponse = require("../../utils/errorResponse");
const { Notification, User} = require("../../models");

const { getVerificationToken } = require("../../utils/auth");
const sendEmail = require("../../utils/sendEmail");


const addRequestToken = async (req) => {
    try {

        const verificationToken = await getVerificationToken();

        const checks = await  User.findByPk(req.user.id)
        if(!checks){
            throw new ErrorResponse(`The user ${req.user.id} was not found`,  401 );
        }

        const result = checks.update({
            verificationToken: verificationToken.token,
            verificationTokenExpire: verificationToken.expires
        });


        // find: EMAIL_TEMPLATE
        const message = `Dear ${checks.firstname || "esteemed user"}, \n
        Welcome to Bloomzon. Use the number below to complete your verification process \n
        ${verificationToken.tokenCode}\n
        If you didn't initiate this action, kindly ignore this mail.`;


        await sendEmail({
            email: checks.changeEmail,
            subject: "Verification Process",
            body: message,
        });

        // console.log(verificationToken.tokenCode)

    
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addRequestToken;