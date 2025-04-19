const ErrorResponse = require("../../utils/errorResponse");
const { Notification, SellerBusinessStore} = require("../../models");


const addStoreTaxConfirmation = async (req) => {
    try {

        const checks = await  SellerBusinessStore.findByPk(req.body.sellerBusinessStoreId)
        if(!checks){
            throw new ErrorResponse(`The business store ${req.body.sellerBusinessStoreId} was not found`,  401 );
        }

        const result = checks.update({
            taxFileName: req.body.taxFileName,
            taxFileDate: req.body.taxFileDate,
        });

        await Notification.create({
            UserId: req.user.id,
            message: `Your business store tax details has been filed at ${req.body.taxFileDate} by ${req.body.taxFileName}`,
            category: "business",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addStoreTaxConfirmation;