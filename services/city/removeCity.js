const ErrorResponse = require("../../utils/errorResponse");
const {City} = require("../../models");


const removeCity = async (req) => {
    try {
        const city = await City.findOne({
            where: [{
                id : req.body.cityId
            }]
        })
        if(!city){
            throw new ErrorResponse(`The City ${req.body.cityId} was not found`,  401 );
        }
        const result = city.name
        await city.destroy();

        return `The City ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeCity;