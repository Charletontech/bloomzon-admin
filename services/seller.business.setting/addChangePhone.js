const ErrorResponse = require("../../utils/errorResponse");
const { Notification, User} = require("../../models");

const crypto = require("crypto");
const { Op } =  require('@sequelize/core');


const addChangePhone = async (req) => {
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
            phone: user.changePhone,
            verificationTokenExpire: null,
            verificationToken: 0,
            changePhone: '',
        });

        await Notification.create({
            UserId: req.user.id,
            message: `Your account phone has been changed`,
            category: "settings",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addChangePhone;