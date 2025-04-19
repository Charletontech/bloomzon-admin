const ErrorResponse = require("../../utils/errorResponse");
const {State, City} = require("../../models");

const addCity = async (req) => {
    try {

        const state = await  State.findOne({
            where: [{
                id : req.body.stateId
            }]
        })
        if(!state){
            throw new ErrorResponse(`The state ${req.body.stateId} was not found`,  401 );
        }

        const citys = await  City.findAll({
            where: [{
                name: req.body.name,
                StateId: req.body.stateId
            }]
        })
        if(citys.length>0){
            throw new ErrorResponse(`The City ${req.body.name} already exist`,  401 );
        }
        
        return City.create({...req.body, StateId: req.body.stateId});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addCity;