const ErrorResponse = require("../../utils/errorResponse");
const {SellerPlan} = require("../../models");


const removeSellerPlan = async (req) => {
    try {
        const sellerPlan = await SellerPlan.findByPk(req.body.sellerPlanId)
        if(!sellerPlan){
            throw new ErrorResponse(`The Seller plan ${req.body.sellerPlanId} was not found`,  401 );
        }
        const result = sellerPlan.endAt
        await sellerPlan.destroy();

        return `The Seller Plan expiring at ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeSellerPlan;