const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusiness, Notification} = require("../../models");


const removePaymentOption = async (req) => {
    try {
        const card = await SellerBusiness.findOne({
            where: [{
                id : req.body.sellerBusinessId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The business ${req.body.sellerBusinessId} was not found`,  401 );
        }
        const result = card.spiName
        await card.destroy();

        await Notification.create({
            UserId: card.UserId,
            message: `Your business ${result} has been removed`,
            category: "business",
        });

        return `The business ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removePaymentOption;