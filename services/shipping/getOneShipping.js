const ErrorResponse = require("../../utils/errorResponse");
const {Shipping} = require("../../models");


const getShipping = async (req) => {
    try {
        let options = {}
        options.id = req.query.shippingId
        
        const card = await Shipping.findOne({
            where: [options],
        })
        return card
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getShipping;