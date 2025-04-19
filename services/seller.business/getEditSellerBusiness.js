const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusiness, Notification} = require("../../models");


const getEditSellerBusiness = async (req) => {
    try {
        const card = await  SellerBusiness.findOne({
            where: [{
                id : req.body.sellerBusinessId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The business ${req.body.sellerBusinessId} was not found`,  401 );
        }

        const result = card.update({
            status: req.body.status
        });

        await Notification.create({
            UserId: card.UserId,
            message: `Your business has been ${req.body.status}`,
            category: "business",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getEditSellerBusiness;