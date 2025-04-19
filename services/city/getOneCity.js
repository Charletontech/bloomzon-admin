const ErrorResponse = require("../../utils/errorResponse");
const {City, State, Country, Region} = require("../../models");


const getOneCity = async (req) => {
    try {
        const city = await City.findByPk(req.query.cityId, {
            where: [{
                status: "active"
            }],
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

module.exports = getOneCity;