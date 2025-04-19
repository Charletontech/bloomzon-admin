const ErrorResponse = require("../../utils/errorResponse");
const {Region} = require("../../models");


const getRegion = async (req) => {
    try {
        const region = await Region.findOne({
            where: [{
                id : req.query.regionId
            }]
        })
        return region
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getRegion;