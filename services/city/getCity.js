const ErrorResponse = require("../../utils/errorResponse");
const {City, State, Country, Region} = require("../../models");


const getCity = async (req) => {
    try {
        const city = await City.findAll({
            where: {
                status: "active"
            },
            include: [{
                model: State,
                include: [
                    {
                        model: Country,
                        include: [{model: Region}]
                    }
                ]
            }]
        })
        return city
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getCity;