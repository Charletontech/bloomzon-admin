const ErrorResponse = require("../../utils/errorResponse");
const {ShippingSelf, User, Region, Country} = require("../../models");


const getShippingSelf = async (req) => {
    try {
        let options = {
            include: [
                {
                    model: User
                }
            ]
        }
        const cards = await ShippingSelf.findAll(options)
        return cards
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getShippingSelf;