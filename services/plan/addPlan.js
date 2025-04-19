const ErrorResponse = require("../../utils/errorResponse");
const {Plan} = require("../../models");


const addPlan = async (req) => {
    try {
        const plan = await  Plan.findAll({
            where: [{
                name: req.body.name
            }]
        })
        if(plan.length>0){
            throw new ErrorResponse(`The plan ${req.body.name} already exist`,  401 );
        }
        return Plan.create(req.body);
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addPlan;