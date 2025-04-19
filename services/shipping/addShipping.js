const ErrorResponse = require("../../utils/errorResponse");
const {Shipping} = require("../../models");


const addShipping = async (req) => {
    try {
        const card = await  Shipping.findAll({
            where: [{
                name: req.body.name,
                rate: req.body.rate
            }]
        })
        if(card.length>0){
            throw new ErrorResponse(`The shipping option ${req.body.name} already exist`,  401 );
        }
       
        return Shipping.create(req.body);
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addShipping;