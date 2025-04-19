const ErrorResponse = require("../../utils/errorResponse");
const {State, Country, City, Region} = require("../../models");


const getCountryState = async (req) => {
    try {
        const options = {
            attributes: {exclude: ["createdAt", "updatedAt"]}
        }
        options.include = [
            {
                model: Country,
                where: {
                    status: "active"
                },
                attributes: {exclude: ["createdAt", "updatedAt"]},
                include: [{model:Region}]
            },
            {
                model: City,
            }
        ];
        const state = await State.findAll(options)
        return state
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getCountryState;