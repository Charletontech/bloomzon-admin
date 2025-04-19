const ErrorResponse = require("../../utils/errorResponse");
const {Plan} = require("../../models");


const editPlan = async (req) => {
    try {
        const plans = await  Plan.findOne({
            where: [{
                id : req.body.planId
            }]
        })
        if(!plans){
            throw new ErrorResponse(`The plan ${req.body.planId} was not found`,  401 );
        }

        const planCheck = await  Plan.findAll({
            where: [{
                name : req.body.name
            }]
        })
        if(planCheck.length>0){
            throw new ErrorResponse(`A plan ${req.body.name} already exist`,  401 );
        }

        const result = plans.update({
            name: req.body.name,
            description: req.body.description,
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editPlan;