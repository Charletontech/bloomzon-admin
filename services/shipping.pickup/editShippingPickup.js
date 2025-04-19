const ErrorResponse = require("../../utils/errorResponse");
const {ShippingPickup, City, Country, State} = require("../../models");


const editShippingPickup = async (req) => {
    try {
        const card = await  ShippingPickup.findOne({
            where: [{
                id : req.body.shippingPickupId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The self shipping  option ${req.body.shippingPickupId} was not found`,  401 );
        }

        if(!card.UserId == req.user.id){
            throw new ErrorResponse(`The self shipping  option ${req.body.shippingPickupId} is not yours`,  401 );
        }

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

        const ShippingPickupCheck = await  ShippingPickup.findAll({
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
        if(ShippingPickupCheck.length>0){
            throw new ErrorResponse(`A self Shipping option ${req.body.shippingPickupId} already exist`,  401 );
        }
        
        const result = card.update({
            contactname: req.body.contactname,
            address: req.body.address,
            pincode: req.body.pincode,
            phone: req.body.phone,
            CityId: req.body.cityId,
            StateId: city.StateId,
            CountryId: state.CountryId,
            UserId: req.user.id,
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editShippingPickup;