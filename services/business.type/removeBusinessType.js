const ErrorResponse = require("../../utils/errorResponse");
const {BusinessType} = require("../../models");


const removeBusinessType = async (req) => {
    try {
        const businessType = await BusinessType.findOne({
            where: [{
                id : req.body.businessTypeId
            }]
        })
        if(!businessType){
            throw new ErrorResponse(`The BusinessType ${req.body.businessTypeId} was not found`,  401 );
        }
        const result = businessType.name
        await businessType.destroy();

        return `The BusinessType ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeBusinessType;