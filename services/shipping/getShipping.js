const ErrorResponse = require("../../utils/errorResponse");
const {Shipping} = require("../../models");


const getShipping = async (req) => {
    try {
        let options = {}
        const cards = await Shipping.findAll(options)
        return cards
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getShipping;