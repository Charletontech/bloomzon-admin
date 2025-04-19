const ErrorResponse = require("../../utils/errorResponse");
const {State} = require("../../models");

const activateState = async (req) => {

    const response = await State.update(
        {   status: 'active' },
        {
            where: {
                id: req.body.stateId,
            },
        },
    );
    return response;
};

module.exports = activateState;