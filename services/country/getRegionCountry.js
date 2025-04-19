const ErrorResponse = require("../../utils/errorResponse");
const {Region, Country, City, State} = require("../../models");


const getRegionCountry = async (req) => {
    try {
        const options = {
            attributes: {exclude: ["createdAt", "updatedAt"]}
        }
        options.include = [{
            model: Country,
            where: {
                status: "active"
            },
            attributes: {exclude: ["createdAt", "updatedAt"]},
            include: [
                {
                    model: State,
                    include: [{
                        model: City
                    }]
                }
            ]
        }];
        const region = await Region.findAll(options)
        return region
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getRegionCountry;