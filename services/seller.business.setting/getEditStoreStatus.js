const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusinessStore, Notification} = require("../../models");


const getEditStoreStatus = async (req) => {
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

        const result = card.update({
            storeStatus: req.body.status,
        });

        await Notification.create({
            UserId: card.UserId,
            message: `Your marketplace has been updated to ${req.body.status}`,
            category: "business",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getEditStoreStatus;