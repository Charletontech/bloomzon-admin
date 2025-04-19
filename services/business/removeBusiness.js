const ErrorResponse = require("../../utils/errorResponse");
const {Business} = require("../../models");


const removeBusiness = async (req) => {
    try {
        const business = await Business.findOne({
            where: [{
                id : req.body.businessId
            }]
        })
        if(!business){
            throw new ErrorResponse(`The Business ${req.body.businessId} was not found`,  401 );
        }
        const result = business.name
        await business.destroy();

        return `The Business ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeBusiness;