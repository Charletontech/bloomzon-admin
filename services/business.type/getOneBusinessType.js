const ErrorResponse = require("../../utils/errorResponse");
const {BusinessType} = require("../../models");


const getBusinessType = async (req) => {
    try {
        const businessType = await BusinessType.findOne({
            where: [{
                id : req.query.businessTypeId
            }]
        })
        return businessType
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getBusinessType;