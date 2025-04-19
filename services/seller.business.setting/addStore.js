const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusinessStore, Notification, BStoreOption, SellerBusiness, Country} = require("../../models");


const addStore = async (req) => {
    try {

        const checks = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!checks){
            throw new ErrorResponse(`The business ${req.body.sellerBusinessId} was not found`,  401 );
        }

        const card = await  SellerBusinessStore.findOne({
            where: [{
                CountryId : req.body.countryId,
                marketPlaceState: req.body.state,
                marketPlaceTown: req.body.town,
                marketPlaceAddress: req.body.address,
                UserId: req.user.id,
            }]
        })
        if(card){
            throw new ErrorResponse(`The business store already exist`,  401 );
        }

        const checks1 = await  BStoreOption.findOne({
            where: [
                {SellerBusinessId: req.body.sellerBusinessId}
            ]
        })
        if(!checks1){
            throw new ErrorResponse(`The business ${req.body.sellerBusinessId} has no default store`,  401 );
        }

        const store = await  SellerBusinessStore.findByPk(checks1.SellerBStoreId)
        if(!store){
            throw new ErrorResponse(`The business store ${checks1.SellerBStoreId} was not found`,  401 );
        }

        const country = await  Country.findByPk(req.body.countryId)
        if(!country){
            throw new ErrorResponse(`The country ${req.body.countryId} was not found`,  401 );
        }

        const saveStore = await SellerBusinessStore.create({
            name: store.name,
            sellToBusiness: store.sellToBusiness,
            haveUPCs: store.haveUPCs,
            isManufacturer: store.isManufacturer,
            ProductSubCategoryId: store.ProductSubCategoryId,
            ProductCategoryId: store.ProductCategoryId,
            UserId: req.user.id,
            CountryId: req.body.countryId,
            marketPlaceState: req.body.state,
            marketPlaceTown: req.body.town,
            marketPlaceAddress: req.body.address,
            marketPlacePhone: req.body.phone,
            marketPlaceName: store.marketPlaceName,
            marketPlaceEmail: store.marketPlaceEmail,
            days: ['monday']
        })
        const storeId = saveStore.id

        await BStoreOption.create({
            SellerBusinessId: req.body.sellerBusinessId,
            SellerBStoreId: storeId
        })

        await Notification.create({
            UserId: req.user.id,
            message: `Your new marketplace address has been added`,
            category: "business",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addStore;