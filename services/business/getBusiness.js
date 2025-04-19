const ErrorResponse = require("../../utils/errorResponse");
const {Business} = require("../../models");


const getBusiness = async (req) => {
    try {
        const business = await Business.findAll({})
        return business
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getBusiness;