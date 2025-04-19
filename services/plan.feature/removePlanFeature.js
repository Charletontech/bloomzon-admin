const ErrorResponse = require("../../utils/errorResponse");
const {PlanFeature} = require("../../models");


const removePlanFeature = async (req) => {
    try {
        const planFeature = await PlanFeature.findOne({
            where: [{
                id : req.body.planFeatureId
            }]
        })
        if(!planFeature){
            throw new ErrorResponse(`The plan feature ${req.body.planFeatureId} was not found`,  401 );
        }
        const result = planFeature.name
        await planFeature.destroy();

        return `The plan feature ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removePlanFeature;