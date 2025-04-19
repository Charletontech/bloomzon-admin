const ErrorResponse = require("../../utils/errorResponse");
const {State} = require("../../models");


const removeState = async (req) => {
    try {
        const state = await State.findOne({
            where: [{
                id : req.body.stateId
            }]
        })
        if(!state){
            throw new ErrorResponse(`The State ${req.body.stateId} was not found`,  401 );
        }
        const result = state.name
        await state.destroy();

        return `The state ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeState;