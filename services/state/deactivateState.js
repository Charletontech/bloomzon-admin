const ErrorResponse = require("../../utils/errorResponse");
const {State} = require("../../models");

const deactivateState = async (req) => {

    const response = await State.update(
        {   status: 'inactive' },
        {
            where: {
                id: req.body.stateId,
            },
        },
    );
    return response;
};

module.exports = deactivateState;