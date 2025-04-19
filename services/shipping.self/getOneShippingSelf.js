const ErrorResponse = require("../../utils/errorResponse");
const {ShippingSelf, User, Country, Region} = require("../../models");


const getShippingSelf = async (req) => {
    try {
        let options = {
            
        }
        options.id = req.query.shippingSelfId
        
        const card = await ShippingSelf.findOne({
            where: [options],
            include: [
                {
                    model: User
                }
            ],
        })
        return card
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getShippingSelf;