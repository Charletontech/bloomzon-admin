const ErrorResponse = require("../../utils/errorResponse");
const {State, Country} = require("../../models");

const addState = async (req) => {
    try {
        const country = await  Country.findOne({
            where: [{
                id : req.body.countryId
            }]
        })
        if(!country){
            throw new ErrorResponse(`The country ${req.body.countryId} was not found`,  401 );
        }


        const States = await  State.findAll({
            where: [{
                name: req.body.name
            }]
        })
        if(States.length>0){
            throw new ErrorResponse(`The State ${req.body.name} already exist`,  401 );
        }
        
        return State.create({...req.body, CountryId: req.body.countryId});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addState;