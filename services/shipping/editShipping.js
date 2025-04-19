const ErrorResponse = require("../../utils/errorResponse");
const {Shipping} = require("../../models");


const editShipping = async (req) => {
    try {
        const card = await  Shipping.findOne({
            where: [{
                id : req.body.shippingId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The shipping option ${req.body.shippingId} was not found`,  401 );
        }

        const ShippingCheck = await  Shipping.findAll({
            where: [{
                name : req.body.name,
                rate: req.body.rate,
                address: req.body.address,
                itemRate: req.body.itemRate,
                type: req.body.type,
                timing: req.body.timing,
            }]
        })
        if(ShippingCheck.length>0){
            throw new ErrorResponse(`A shipping option ${req.body.shippingId} already exist`,  401 );
        }
        
        const result = card.update({
            name: req.body.name,
            rate: req.body.rate,
            address: req.body.address,
            itemRate: req.body.itemRate,
            type: req.body.type,
            timing: req.body.timing,
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editShipping;