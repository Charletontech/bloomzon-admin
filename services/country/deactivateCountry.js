const ErrorResponse = require("../../utils/errorResponse");
const {Country} = require("../../models");

const deactivateCountry = async (req) => {

    const response = await Country.update(
        {   status: 'inactive' },
        {
            where: {
                id: req.body.countryId,
            },
        },
    );
    return response;
};

module.exports = deactivateCountry;