const ErrorResponse = require("../../utils/errorResponse");
const {PaymentOption, User} = require("../../models");
const { hideUser } = require("../../utils/hideFields");


const getMyPaymentOption = async (req) => {
    try {
        let options = {}
        options.where = [{ id: req.user.id} ]
        options.include = [{ model: PaymentOption }]
        const cards = await User.findAll(options)
        return cards
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getMyPaymentOption;