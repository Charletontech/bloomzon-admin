const ErrorResponse = require("../../utils/errorResponse");
const {ShippingPickup, Country, State, City} = require("../../models");


const addShippingPickup = async (req) => {
    try {
        const city = await  City.findOne({
            where: [{
                id: req.body.cityId
            }]
        })
        if(!city){
            throw new ErrorResponse(`The city ${req.body.cityId} was not found`,  401 );
        }

        const state = await  State.findOne({
            where: [{
                id: city.StateId
            }]
        })
        if(!state){
            throw new ErrorResponse(`The state ${city.StateId} was not found`,  401 );
        }

        const country = await  Country.findOne({
            where: [{
                id: state.CountryId
            }]
        })
        if(!country){
            throw new ErrorResponse(`The country ${state.CountryId} was not found`,  401 );
        }
            
        
        const card = await  ShippingPickup.findAll({
            where: [{
                contactname: req.body.contactname,
                address: req.body.address,
                pincode: req.body.pincode,
                CityId: req.body.cityId,
                StateId: city.StateId,
                CountryId: state.CountryId,
                UserId: req.user.id,
            }]
        })
        if(card.length>0){
            throw new ErrorResponse(`The pickup shipping option ${req.body.contactname} already exist`,  401 );
        }
       
        return ShippingPickup.create({...req.body, UserId: req.user.id, CityId: req.body.cityId, StateId: city.StateId, CountryId: state.CountryId});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addShippingPickup;