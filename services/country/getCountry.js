const ErrorResponse = require("../../utils/errorResponse");
const {Country, Region, State, City} = require("../../models");


const getCountry = async (req) => {
    try {
        const country = await Country.findAll({
            where: {
                status: "active"
            },
            include: [
                {
                    model: Region
                },
                {
                    model: State,
                    include: [{
                        model: City
                    }]
                }
            ]
        })
        return country
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getCountry;