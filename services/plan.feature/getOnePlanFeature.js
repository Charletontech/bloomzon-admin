const ErrorResponse = require("../../utils/errorResponse");
const {Plan, PlanFeature} = require("../../models");


const getPlanFeature = async (req) => {
    try {
        const planFeature = await PlanFeature.findOne({
            where: [{
                id : req.query.planFeatureId
            }],
            include: [
                { model: Plan },
                { model: Country, include: [ {model: Region} ] },
            ]
        })
        return planFeature
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getPlanFeature;