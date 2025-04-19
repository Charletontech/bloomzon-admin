const ErrorResponse = require("../../utils/errorResponse");
const {ShippingPickup} = require("../../models");


const editShippingPickupTiming = async (req) => {
    try {
        const card = await  ShippingPickup.findOne({
            where: [{
                id : req.body.shippingPickupId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The self shipping  option ${req.body.shippingPickupId} was not found`,  401 );
        }

        if(!card.UserId == req.user.id){
            throw new ErrorResponse(`The self shipping  option ${req.body.shippingPickupId} is not yours`,  401 );
        }
        
        const result = card.update({
            timing: req.body.timing
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editShippingPickupTiming;