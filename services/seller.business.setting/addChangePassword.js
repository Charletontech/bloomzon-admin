const ErrorResponse = require("../../utils/errorResponse");
const { Notification, User} = require("../../models");

const { matchpassword, incrementLoginAttempts } = require("../../utils/auth");
const { pwd } = require("../../utils/auth");

const addChangePassword = async (req) => {
    try {
        
        const user = await User.findByPk(req.user.id);
        if (!user) {
            throw new ErrorResponse("User not found", 400);
        }

        const isMatch = await matchpassword(req.body.currentPassword, user);
        if (!isMatch) {
            throw new ErrorResponse("Invalid password", 400);
        }

        const newPassword = await pwd(req.body.newPassword);
        const result = user.update({
            password: newPassword,
        });

        await Notification.create({
            UserId: req.user.id,
            message: `Your account password has been changed`,
            category: "settings",
        });

        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addChangePassword;