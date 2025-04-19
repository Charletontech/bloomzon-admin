const ErrorResponse = require("../../utils/errorResponse");
const {Plan} = require("../../models");


const removePlan = async (req) => {
    try {
        const plan = await Plan.findOne({
            where: [{
                id : req.body.planId
            }]
        })
        if(!plan){
            throw new ErrorResponse(`The Plan ${req.body.planId} was not found`,  401 );
        }
        const result = plan.name
        await plan.destroy();

        return `The Plan ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removePlan;