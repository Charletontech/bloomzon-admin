const ErrorResponse = require("../../utils/errorResponse");
const {State, Country, City} = require("../../models");


const getOneState = async (req) => {
    try {
        const state = await State.findByPk(req.query.stateId, {
            where: [{
                status: "active"
            }],
            include: [
                {
                    model: Country
                },
                {
                    model: City
                }
            ]
        })
        return state
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getOneState;