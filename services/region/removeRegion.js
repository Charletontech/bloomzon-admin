const ErrorResponse = require("../../utils/errorResponse");
const {Region} = require("../../models");


const removeRegion = async (req) => {
    try {
        const region = await Region.findOne({
            where: [{
                id : req.body.regionId
            }]
        })
        if(!region){
            throw new ErrorResponse(`The region ${req.body.regionId} was not found`,  401 );
        }
        const result = region.name
        await region.destroy();

        return `The region ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeRegion;