const ErrorResponse = require("../../utils/errorResponse");
const { Notification, User} = require("../../models");


const addChangeName = async (req) => {
    try {

        const checks = await  User.findByPk(req.user.id)
        if(!checks){
            throw new ErrorResponse(`The user ${req.user.id} was not found`,  401 );
        }

        const result = checks.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });

        await Notification.create({
            UserId: req.user.id,
            message: `Your account name has been changed`,
            category: "settings",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addChangeName;