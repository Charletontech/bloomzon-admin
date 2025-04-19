const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusinessStore, Notification, SellerBusinessStoreResolution} = require("../../models");


const removeStoreReturnResolution = async (req) => {
    try {
        const card = await SellerBusinessStoreResolution.findOne({
            where: [{
                id : req.body.sellerBusinessStoreResolutionId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The business store return resolution rule ${req.body.sellerBusinessStoreResolutionId} was not found`,  401 );
        }
        const result = card.name


        const checks = await  SellerBusinessStore.findOne({
            where: [{
                id : card.SellerBStoreId,
                UserId: req.user.id
            }]
        })
        if(!checks){
            throw new ErrorResponse(`The business store ${card.SellerBStoreId} is not yours`,  401 );
        }


        await card.destroy();

        await Notification.create({
            UserId: checks.UserId,
            message: `Your business store return resolution rule  ${result} has been removed`,
            category: "business",
        });

        return `The business store return resolution rule  ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeStoreReturnResolution;