const ErrorResponse = require("../../utils/errorResponse");
const {Plan, PlanFeature, Country, Region} = require("../../models");


const getPlanFeature = async (req) => {
    try {
        let options = {}
        if (req.query.countryId){
            options.CountryId =  req.query.countryId
        }
        const planFeature = await PlanFeature.findAll({
            where: [options],
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