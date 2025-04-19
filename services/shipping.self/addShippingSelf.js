const ErrorResponse = require("../../utils/errorResponse");
const {ShippingSelf, Region} = require("../../models");


const addShippingSelf = async (req) => {
    try {
        const regions = req.body.regions
        for (let i7 = 0; i7 < regions.length; i7++) {
            const region = regions[i7];
            const card = await  Region.findOne({
                where: [{
                    id: region
                }]
            })
            if(!card){
                throw new ErrorResponse(`The region ${region} was not found`,  401 );
            }
            
        }
        const card = await  ShippingSelf.findAll({
            where: [{
                name: req.body.name,
                rate: req.body.rate,
                UserId: req.user.id,
            }]
        })
        if(card.length>0){
            throw new ErrorResponse(`The self shipping option ${req.body.name} already exist`,  401 );
        }
       
        return ShippingSelf.create({...req.body, UserId: req.user.id});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addShippingSelf;