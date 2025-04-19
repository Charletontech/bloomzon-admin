const ErrorResponse = require("../../utils/errorResponse");
const {Business} = require("../../models");


const editBusiness = async (req) => {
    try {
        const businesss = await  Business.findOne({
            where: [{
                id : req.body.businessId
            }]
        })
        if(!businesss){
            throw new ErrorResponse(`The Business ${req.body.businessId} was not found`,  401 );
        }

        const businessCheck = await  Business.findAll({
            where: [{
                name : req.body.name
            }]
        })
        if(businessCheck.length>0){
            throw new ErrorResponse(`A Business ${req.body.name} already exist`,  401 );
        }
       
        const result = businesss.update({
            name: req.body.name,
            monthlySubscription: req.body.monthlySubscription,
            monthlySubscriptionDiscount: req.body.monthlySubscriptionDiscount,
            yearlySubscription: req.body.yearlySubscription,
            yearlySubscriptionDiscount: req.body.yearlySubscriptionDiscount,
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editBusiness;