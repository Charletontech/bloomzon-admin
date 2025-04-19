const ErrorResponse = require("../../utils/errorResponse");
const {Shipping} = require("../../models");


const removeShipping = async (req) => {
    try {
        const card = await Shipping.findOne({
            where: [{
                id : req.body.shippingId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The payment option ${req.body.shippingId} was not found`,  401 );
        }
        const result = card.name
        await card.destroy();

        return `The shipping option ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeShipping;