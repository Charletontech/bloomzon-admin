const ErrorResponse = require("../../utils/errorResponse");
const {Plan, PlanFeature, SellerPlan, User, Country, Region, SellerBusiness} = require("../../models");


const getUserSellerPlan = async (req) => {
    try {
        const sellerPlan = await SellerPlan.findOne({
            where: [{'UserId': req.query.userId}],
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

module.exports = getUserSellerPlan;