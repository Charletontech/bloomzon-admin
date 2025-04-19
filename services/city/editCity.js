const ErrorResponse = require("../../utils/errorResponse");
const {State,  City} = require("../../models");
const s3Upload = require("../../utils/s3.upload");

const editCity = async (req) => {
    try {
        const state = await  State.findOne({
            where: [{
                id : req.body.stateId
            }]
        })
        if(!state){
            throw new ErrorResponse(`The state ${req.body.stateId} was not found`,  401 );
        }

        const city = await  City.findOne({
            where: [{
                id : req.body.cityId
            }]
        })
        if(!city){
            throw new ErrorResponse(`The city ${req.body.cityId} was not found`,  401 );
        }

       
        const stateCheck = await  City.findAll({
            where: [{
                name : req.body.name,
                StateId: req.body.stateId
            }]
        })
        if(stateCheck.length>0){
            throw new ErrorResponse(`A city ${req.body.name} in ${state.name} state already exist`,  401 );
        }

        const result = city.update({
            name: req.body.name,
            StateId: req.body.stateId,
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editCity;