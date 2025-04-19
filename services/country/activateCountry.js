const ErrorResponse = require("../../utils/errorResponse");
const {Country} = require("../../models");

const activateCountry = async (req) => {

    const response = await Country.update(
        {   status: 'active' },
        {
            where: {
                id: req.body.countryId,
            },
        },
    );
    return response;
};

module.exports = activateCountry;