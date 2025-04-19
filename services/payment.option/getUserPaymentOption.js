const ErrorResponse = require("../../utils/errorResponse");
const {PaymentOption, User} = require("../../models");
const { hideUser } = require("../../utils/hideFields");


const getUserPaymentOption = async (req) => {
    try {
        let options = {}
        options.where = [{ id: req.query.userId } ]
        options.include = [{ model: PaymentOption }]
        const cards = await User.findAll(options)
        return cards
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getUserPaymentOption;