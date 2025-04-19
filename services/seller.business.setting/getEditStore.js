const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusinessStore, Notification} = require("../../models");


const getEditStore = async (req) => {
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
            name: req.body.name,
            marketPlaceName: req.body.marketPlaceName,
            marketPlacePhone: req.body.marketPlacePhone,
            marketPlaceEmail: req.body.marketPlaceEmail,
            CountryId: req.body.countryId,
        });

        await Notification.create({
            UserId: card.UserId,
            message: `Your marketplace has been updated`,
            category: "business",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getEditStore;