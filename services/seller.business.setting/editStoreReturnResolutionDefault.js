const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusinessStore, Notification, SellerBusinessStoreResolution, ProductsCategory} = require("../../models");


const editStoreReturnResolutionDefault = async (req) => {
    try {
        

        const card1 = await  SellerBusinessStoreResolution.findOne({
            where: [{
                id : req.body.sellerBusinessStoreResolutionId
            }]
        })
        if(!card1){
            throw new ErrorResponse(`The business store return resolution rule ${req.body.sellerBusinessStoreResolutionId} was not found`,  401 );
        }

        const card = await  SellerBusinessStore.findOne({
            where: [{
                id : card1.SellerBStoreId,
                UserId: req.user.id
            }]
        })
        if(!card){
            throw new ErrorResponse(`The business store ${card1.SellerBStoreId} is not yours`,  401 );
        }

        const check1 = await  SellerBusinessStoreResolution.findOne({
            where: [{
                isDefault: true
            }]
        })
        if(check1){
            check1.update({ isDefault: false });
        }

        const result = card1.update({
            isDefault: true
        });
        

        await Notification.create({
            UserId: card.UserId,
            message: `Your business return resolution rule has been updated`,
            category: "business",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editStoreReturnResolutionDefault;