const ErrorResponse = require("../../utils/errorResponse");
const {ShippingPickup} = require("../../models");


const removeShippingPickup = async (req) => {
    try {
        const card = await ShippingPickup.findOne({
            where: [{
                id : req.body.shippingPickupId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The self shipping option ${req.body.shippingPickupId} was not found`,  401 );
        }
        const result = card.name
        await card.destroy();

        return `The self shipping  option ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeShippingPickup;