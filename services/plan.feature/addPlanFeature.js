const ErrorResponse = require("../../utils/errorResponse");
const {Plan, PlanFeature, Country} = require("../../models");


const addPlanFeature = async (req) => {
    try {
        const plan = await Plan.findOne({
            where: [{
                id : req.body.planId
            }]
        })
        if(!plan){
            throw new ErrorResponse(`The plan ${req.body.planId} was not found`,  401 );
        }

        const country = await Country.findOne({
            where: [{
                id : req.body.countryId
            }]
        })
        if(!country){
            throw new ErrorResponse(`The country ${req.body.countryId} was not found`,  401 );
        }

        const planFeature = await  PlanFeature.findAll({
            where: [{
                name: req.body.name,
                PlanId: req.body.planId,
                CountryId: req.body.countryId

            }]
        })
        if(planFeature.length>0){
            throw new ErrorResponse(`The Plan Feature ${req.body.name} for the plan ${plan.name} already exist`,  401 );
        }
        return PlanFeature.create({...req.body, PlanId: req.body.planId, CountryId: req.body.countryId});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addPlanFeature;