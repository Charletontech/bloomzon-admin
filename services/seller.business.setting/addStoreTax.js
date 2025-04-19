const ErrorResponse = require("../../utils/errorResponse");
const { Notification, SellerBusinessStore} = require("../../models");


const addStoreTax = async (req) => {
    try {

        const checks = await  SellerBusinessStore.findByPk(req.body.sellerBusinessStoreId)
        if(!checks){
            throw new ErrorResponse(`The business store ${req.body.sellerBusinessStoreId} was not found`,  401 );
        }

        const result = checks.update({
            taxClass: req.body.taxClass,
            taxUSCitizen: req.body.taxUSCitizen,
            taxReturnName: req.body.taxReturnName,
            taxTradeName: req.body.taxTradeName,
            taxTradeAddress: req.body.taxTradeAddress,
            taxType: req.body.taxType,
            taxNumber: req.body.taxNumber,
        });

        await Notification.create({
            UserId: req.user.id,
            message: `Your business store tax details has been modified`,
            category: "business",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addStoreTax;