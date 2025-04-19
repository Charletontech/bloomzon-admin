const ErrorResponse = require("../../utils/errorResponse");
const {Plan, PlanFeature, SellerPlan, User, Country, Region, SellerBusiness} = require("../../models");


const getSellerPlan = async (req) => {
    try {
        const sellerPlan = await SellerPlan.findByPk(req.query.sellerPlanId, {
            include: [
                { model: User },
                { model: PlanFeature, include: [ { model: Plan }, { model: Country, include: [ { model: Region } ] } ] },
                { model: SellerBusiness }
                
            ]
        })
        return sellerPlan
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getSellerPlan;