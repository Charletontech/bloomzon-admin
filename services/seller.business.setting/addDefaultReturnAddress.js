const ErrorResponse = require("../../utils/errorResponse");
const { Notification, SellerBusiness, SellerBusinessStore} = require("../../models");


const addDefaultReturnAddress = async (req) => {
    try {

        const checks = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!checks){
            throw new ErrorResponse(`The business ${req.body.sellerBusinessId} was not found`,  401 );
        }

        const checkStore = await  SellerBusinessStore.findByPk(req.body.sellerBusinessStoreId)
        if(!checkStore){
            throw new ErrorResponse(`The business store ${req.body.sellerBusinessStoreId} was not found`,  401 );
        }

        const result = checks.update({
            returnAddressDefault: req.body.sellerBusinessStoreId
        });

        await Notification.create({
            UserId: req.user.id,
            message: `Your business return default address has been modified`,
            category: "business",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addDefaultReturnAddress;