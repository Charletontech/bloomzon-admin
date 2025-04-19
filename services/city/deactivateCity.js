const ErrorResponse = require("../../utils/errorResponse");
const {City} = require("../../models");

const deactivateCity = async (req) => {

    const response = await City.update(
        {   status: 'inactive' },
        {
            where: {
                id: req.body.cityId,
            },
        },
    );
    return response;
};

module.exports = deactivateCity;