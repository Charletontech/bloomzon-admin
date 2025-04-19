const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusiness, Notification, BStoreOption, SellerBusinessStore, ProductsSubCategory} = require("../../models");


const addSISellerBusiness = async (req) => {
    try {

        const check_sellerBusiness = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!check_sellerBusiness){
            throw new ErrorResponse(`The seller business ${req.body.sellerBusinessId} not found`,  401 );
        }
        
        if(!check_sellerBusiness.UserId == req.user.id){
            throw new ErrorResponse(`The seller business registration ${req.body.sellerBusinessId} does not belong to you`,  401 );
        }

        const check_productsSubCategory = await  ProductsSubCategory.findByPk(req.body.productSubCategoryId)
        if(!check_productsSubCategory){
            throw new ErrorResponse(`The product category ${req.body.productSubCategoryId} not found`,  401 );
        }
        // console.log(check_productsSubCategory)

        let storeId = null
        const check_sellerBusinessStore = await  SellerBusinessStore.findOne({
            where: [{
                name: req.body.name,
                sellToBusiness: req.body.sellToBusiness,
                haveUPCs: req.body.haveUPCs,
                isManufacturer: req.body.isManufacturer,
                ProductSubCategoryId: req.body.productSubCategoryId,
                ProductCategoryId: check_productsSubCategory.ProductsCategoryId,
                UserId: req.user.id
            }]
        })
        if(!check_sellerBusinessStore){
            const saveStore = await SellerBusinessStore.create({
                name: req.body.name,
                sellToBusiness: req.body.sellToBusiness,
                haveUPCs: req.body.haveUPCs,
                isManufacturer: req.body.isManufacturer,
                ProductSubCategoryId: req.body.productSubCategoryId,
                ProductCategoryId: check_productsSubCategory.ProductsCategoryId,
                UserId: req.user.id,
                CountryId: check_sellerBusiness.CountryOfIssue,
                marketPlaceState: check_sellerBusiness.avState,
                marketPlaceTown: check_sellerBusiness.avCity,
                marketPlaceAddress: check_sellerBusiness.avStreet,
                days: ['mondays']
            })
            storeId = saveStore.id
        }else{
            storeId = check_sellerBusinessStore.id
        }

        const check_sellerBusinessPaymentOption = await  BStoreOption.findOne({
            where: [{
                SellerBusinessId: req.body.sellerBusinessId,
                SellerBStoreId: storeId
            }]
        })
        if(!check_sellerBusinessPaymentOption){
            await BStoreOption.create({
                SellerBusinessId: req.body.sellerBusinessId,
                SellerBStoreId: storeId
            })
        }
       check_sellerBusiness.update({phase: 5})
       const data = await  SellerBusiness.findByPk(req.body.sellerBusinessId, {
        include: [{
            model: SellerBusinessStore
        }]
       })
        return data;
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addSISellerBusiness;