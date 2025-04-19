const ErrorResponse = require("../../utils/errorResponse");
const { Notification, User} = require("../../models");



const addVerificationMethod = async (req) => {
    try {

        const checks = await  User.findByPk(req.user.id)
        if(!checks){
            throw new ErrorResponse(`The user ${req.user.id} was not found`,  401 );
        }

        const result = checks.update({
            verificationMethod: req.body.method,
        });

        await Notification.create({
            UserId: req.user.id,
            message: `Your account verification method has been changed`,
            category: "settings",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addVerificationMethod;