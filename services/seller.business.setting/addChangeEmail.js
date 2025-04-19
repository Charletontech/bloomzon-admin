const ErrorResponse = require("../../utils/errorResponse");
const { Notification, User} = require("../../models");

const crypto = require("crypto");
const { Op } =  require('@sequelize/core');


const addChangeEmail = async (req) => {
    try {

        let token = String(req.body.token);
        const verificationToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            where: {
                verificationToken,
                verificationTokenExpire: { [Op.gt]: Date.now() },
            }
        });
        if (!user) {
            throw new ErrorResponse("Invalid token", 400);
        }

        const result = user.update({
            email: user.changeEmail,
            verificationTokenExpire: null,
            verificationToken: 0,
            changeEmail: '',
        });

        await Notification.create({
            UserId: req.user.id,
            message: `Your account email has been changed`,
            category: "settings",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addChangeEmail;