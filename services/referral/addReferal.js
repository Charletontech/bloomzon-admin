const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");
const asyncHandler = require("../../middleware/async");

const addReferal = async (req) => {
    try {
        const referralCode = req.body.referralCode;
        if (req.user.referredBy) {
          throw new ErrorResponse("operation not permitted", 401);
        }
        if (!referralCode || referralCode == "") {
          throw new ErrorResponse("referral code requred", 400);
        }
        const referal = await User.findOne({ where: [{referralCode: referralCode}] });
        // console.log(referal);
        if (!referal) {
          throw new ErrorResponse("Enter a valid referral code", 400);
        }
        const user = await User.findByPk(req.user.id);
        user.update({
            referredBy: referralCode
        })
        return user
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addReferal