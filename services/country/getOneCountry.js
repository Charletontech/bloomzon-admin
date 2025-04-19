const ErrorResponse = require("../../utils/errorResponse");
const {Country, Region, City, State} = require("../../models");


const getOneCountry = async (req) => {
    try {
        const country = await Country.findByPk(req.query.countryId, {
            where: [{
                status: "active"
            }],
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

module.exports = getOneCountry;