const ErrorResponse = require("../../utils/errorResponse");
const {ShippingSelf} = require("../../models");


const removeShippingSelf = async (req) => {
    try {
        const card = await ShippingSelf.findOne({
            where: [{
                id : req.body.shippingSelfId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The self shipping option ${req.body.shippingSelfId} was not found`,  401 );
        }
        const result = card.name
        await card.destroy();

        return `The self shipping  option ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeShippingSelf;