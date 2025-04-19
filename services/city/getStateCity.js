const ErrorResponse = require("../../utils/errorResponse");
const {State, Country, Region, City} = require("../../models");


const getStateCity = async (req) => {
    try {
        const options = {
            attributes: {exclude: ["createdAt", "updatedAt"]}
        }
        options.include = [{
            model: State,
            where: {
                status: "active"
            },
            attributes: {exclude: ["createdAt", "updatedAt"]},
            include: [{
                model: Country,
                where: {
                    status: "active"
                },
                attributes: {exclude: ["createdAt", "updatedAt"]},
                include: [{
                    model: Region,
                    attributes: {exclude: ["createdAt", "updatedAt"]},
                }]
            }]
        }];
        const city = await City.findAll(options)
        return city
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getStateCity;