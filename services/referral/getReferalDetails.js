const ErrorResponse = require("../../utils/errorResponse");
const {User } = require("../../models");

const getReferalDetails = async (req) => {
    try {
        const referal = await User.findOne({ where: [{ referralCode: req.query.referralCode }] });

        if (!referal) {
            throw new ErrorResponse("User not found", 400);
        }

        const data = {
            firstnae: referal.firstname,
            lastname: referal.lastname,
        };

        return data
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getReferalDetails;