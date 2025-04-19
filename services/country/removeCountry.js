const ErrorResponse = require("../../utils/errorResponse");
const {Country} = require("../../models");


const removeCountry = async (req) => {
    try {
        const country = await Country.findOne({
            where: [{
                id : req.body.countryId
            }]
        })
        if(!country){
            throw new ErrorResponse(`The country ${req.body.countryId} was not found`,  401 );
        }
        const result = country.name
        await country.destroy();

        return `The country ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeCountry;