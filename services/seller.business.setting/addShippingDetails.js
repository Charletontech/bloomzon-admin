const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusinessStore} = require("../../models");


const addShippingDetails = async (req) => {
    try {
        const card = await  SellerBusinessStore.findOne({
            where: [{
                id : req.body.sellerStoreId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The store  ${req.body.sellerStoreId} was not found`,  401 );
        }
        const result = card.update({
            capacity: req.body.capacity,
            handlingTime: req.body.handlingTime,
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addShippingDetails;