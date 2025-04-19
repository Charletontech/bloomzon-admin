const ErrorResponse = require("../../utils/errorResponse");
const {ShippingSelf, User, Region, Country} = require("../../models");


const getUserShippingSelf = async (req) => {
    try {
        let options = {
            
        }
        options.UserId = req.query.userId
        
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

module.exports = getUserShippingSelf;