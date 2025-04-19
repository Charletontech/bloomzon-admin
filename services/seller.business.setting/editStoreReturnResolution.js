const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusinessStore, Notification, SellerBusinessStoreResolution, ProductsCategory} = require("../../models");


const editStoreReturnResolution = async (req) => {
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
            throw new ErrorResponse(`The business store ${card1.SellerBStoreId} was not found`,  401 );
        }


        const card0 = await  ProductsCategory.findOne({
            where: [{
                id : card.ProductCategoryId,
            }]
        })
        if(!card0){
            throw new ErrorResponse(`The business product category ${card.ProductCategoryId} was not found`,  401 );
        }

        const result = card1.update({
            name: req.body.name,
            reasons: req.body.reasons,
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

module.exports = editStoreReturnResolution;