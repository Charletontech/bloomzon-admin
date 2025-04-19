const ErrorResponse = require("../../utils/errorResponse");
const {ShippingPickup, ShippingPickupPackage} = require("../../models");


const editShippingPickupPackage = async (req) => {
    try {
        
        const card = await  ShippingPickup.findOne({
            where: [{
                id : req.body.shippingPickupId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The pickup shipping option ${req.body.shippingPickupId} was not found`,  401 );
        }

        if(!card.UserId == req.user.id){
            throw new ErrorResponse(`The pickup shipping option ${req.body.shippingPickupId} is not yours`,  401 );
        }


        const check = await  ShippingPickupPackage.findOne({
            where: [{
                ShippingPickupId : req.body.shippingPickupId
            }]
        })
        let package = ''
        if(!check){
            package = await ShippingPickupPackage.create({...req.body, UserId: req.user.id, ShippingPickupId: req.body.shippingPickupId});
        }else{

            package = check.update({
                ...req.body, UserId: req.user.id, ShippingPickupId: req.body.shippingPickupId
            });
        }
        return package
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editShippingPickupPackage;