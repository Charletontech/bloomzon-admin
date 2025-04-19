const ErrorResponse = require("../../utils/errorResponse");
const {Plan, PlanFeature, Country} = require("../../models");


const editPlanFeature = async (req) => {
    try {
        const planFeatures = await PlanFeature.findOne({
            where: [{
                id : req.body.planFeatureId
            }]
        })
        if(!planFeatures){
            throw new ErrorResponse(`The plan feature ${req.body.planFeatureId} was not found`,  401 );
        }
        
        let data = {}
        let planId = planFeatures.PlanId
        let countryId = planFeatures.CountryId
        if(req.body.planId){
            planId = req.body.planId
            data.PlanId = planId
        }
        if(req.body.countryId){
            countryId = req.body.countryId
            data.CountryId = countryId
        }

        const plan = await Plan.findOne({
            where: [{
                id : planId
            }]
        })
        if(!plan){
            throw new ErrorResponse(`The plan ${planId} was not found`,  401 );
        }

        const country = await Country.findOne({
            where: [{
                id : req.body.countryId
            }]
        })
        if(!country){
            throw new ErrorResponse(`The country ${req.body.countryId} was not found`,  401 );
        }

        if(req.body.name){
            const planFeatureCheck = await PlanFeature.findAll({
                where: [{
                    name : req.body.name,
                    PlanId : planId,
                    amount : req.body.amount,
                    CountryId : req.body.countryId,
                }]
            })
            if(planFeatureCheck.length>0){
                throw new ErrorResponse(`A plan feature ${req.body.name}  for the plan ${plan.name} already exist`,  401 );
            }
            data.name = req.body.name
        }
        data.description = req.body.description
        data.name = req.body.name
        data.amount = req.body.amount

        const result = planFeatures.update({data});
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editPlanFeature;