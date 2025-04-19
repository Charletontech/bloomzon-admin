const ErrorResponse = require("../../utils/errorResponse");
const { Notification, SellerBusiness} = require("../../models");


const addReturnPolicy = async (req) => {
    try {

        const checks = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!checks){
            throw new ErrorResponse(`The business ${req.body.sellerBusinessId} was not found`,  401 );
        }

        const result = checks.update({
            returnEmails: req.body.receiveReturnEmails,
            returnInstructions: req.body.returnInstructions,
            returnAutomation: req.body.returnAutomation,
        });

        await Notification.create({
            UserId: req.user.id,
            message: `Your business return rules has been modified`,
            category: "business",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addReturnPolicy;