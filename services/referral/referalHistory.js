const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");

const referalHistory = async (req) => {
    try {
        const data = [];
        const referrals = await User.findAll({
            where: [{referredBy: req.user.referralCode}],
        });

        referrals.forEach((ref) => {
            data.push({
                firstname: ref.firstname,
                lastname: ref.lastname,
                isPaidBonus: ref.referralPaid,
                amount: ref?.referrerAmountEarned || "...",
            });
        });
        return data
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = referalHistory;