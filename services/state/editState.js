const ErrorResponse = require("../../utils/errorResponse");
const {State, Country, Region} = require("../../models");
const s3Upload = require("../../utils/s3.upload");

const editState = async (req) => {
    try {
        const country = await  Country.findOne({
            where: [{
                id : req.body.countryId
            }]
        })
        if(!country){
            throw new ErrorResponse(`The country ${req.body.countryId} was not found`,  401 );
        }

        const state = await  State.findOne({
            where: [{
                id : req.body.stateId
            }]
        })
        if(!state){
            throw new ErrorResponse(`The State ${req.body.stateId} was not found`,  401 );
        }

        const stateCheck = await  State.findAll({
            where: [{
                name: req.body.name,
                capital: req.body.capital,
                abbreviation: req.body.abbreviation,
                CountryId: req.body.countryId,
                status: req.body.status
            }]
        })
        if(stateCheck.length>0){
            throw new ErrorResponse(`A State ${req.body.name} already exist`,  401 );
        }

        const result = state.update({
            name: req.body.name,
            capital: req.body.capital,
            abbreviation: req.body.abbreviation,
            CountryId: req.body.countryId,
            status: req.body.status
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editState;