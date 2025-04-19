const ErrorResponse = require("../../utils/errorResponse");
const {Plan, PlanFeature, Country, Region} = require("../../models");


const getPlan = async (req) => {
    try {
        const plan = await Plan.findAll({
            include: [
                { model: PlanFeature, include: [
                    { model: Country, include: [ {model: Region} ] },
                ]}
            ]
        })
        return plan
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getPlan;