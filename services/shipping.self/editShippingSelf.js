const ErrorResponse = require("../../utils/errorResponse");
const {ShippingSelf} = require("../../models");


const editShippingSelf = async (req) => {
    try {
        const card = await  ShippingSelf.findOne({
            where: [{
                id : req.body.shippingSelfId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The self shipping  option ${req.body.shippingSelfId} was not found`,  401 );
        }

        if(!card.UserId == req.user.id){
            throw new ErrorResponse(`The self shipping  option ${req.body.shippingSelfId} is not yours`,  401 );
        }

        const shippingSelfCheck = await  ShippingSelf.findAll({
            where: [{
                name: req.body.name,
                rate: req.body.rate,
                itemratetype: req.body.itemratetype,
                itemRate: req.body.itemRate,
                address: req.body.address,
                addresstype: req.body.addresstype,
                regions: req.body.regions,
                timing: req.body.timing,
            }]
        })
        if(shippingSelfCheck.length>0){
            throw new ErrorResponse(`A self Shipping option ${req.body.shippingSelfId} already exist`,  401 );
        }
        
        const result = card.update({
            name: req.body.name,
            rate: req.body.rate,
            itemratetype: req.body.itemratetype,
            itemRate: req.body.itemRate,
            address: req.body.address,
            addresstype: req.body.addresstype,
            regions: req.body.regions,
            timing: req.body.timing,
            UserId: req.user.id,
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editShippingSelf;