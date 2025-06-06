const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusinessStore, Notification, SellerBusinessStoreResolution, ProductsCategory} = require("../../models");


const addStoreReturnResolution = async (req) => {
    try {
        const card = await  SellerBusinessStore.findOne({
            where: [{
                id : req.body.sellerStoreId,
                UserId: req.user.id
            }]
        })
        if(!card){
            throw new ErrorResponse(`The business store ${req.body.sellerStoreId} was not found`,  401 );
        }


        const card0 = await  ProductsCategory.findOne({
            where: [{
                id : card.ProductCategoryId,
            }]
        })
        if(!card0){
            throw new ErrorResponse(`The business product category ${card.ProductCategoryId} was not found`,  401 );
        }

        const card1 = await  SellerBusinessStoreResolution.findOne({
            where: [{
                name : req.body.name
            }]
        })
        if(card1){
            throw new ErrorResponse(`The business store return resolution rule ${req.body.name} was found`,  401 );
        }

        const result = await SellerBusinessStoreResolution.create({
            name: req.body.name,
            reasons: req.body.reasons,
            SellerBStoreId: req.body.sellerStoreId,
            ProductsCategoryId: card.ProductCategoryId,
        })

       
        await Notification.create({
            UserId: card.UserId,
            message: `Your business return resolution rule has been created`,
            category: "business",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addStoreReturnResolution;