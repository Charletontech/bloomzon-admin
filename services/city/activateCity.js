const ErrorResponse = require("../../utils/errorResponse");
const {City} = require("../../models");

const activateCity = async (req) => {

    const response = await City.update(
        {   status: 'active' },
        {
            where: {
                id: req.body.cityId,
            },
        },
    );
    return response;
};

module.exports = activateCity;