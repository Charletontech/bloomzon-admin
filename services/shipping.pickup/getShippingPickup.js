const ErrorResponse = require("../../utils/errorResponse");
const {ShippingPickup, ShippingPickupPackage, User, Country, City, State, Region} = require("../../models");


const getShippingPickup = async (req) => {
    try {
        let options = {
            include: [
                {
                    model: User
                },
                {
                    model: City,
                    include: [ {
                        model: State,
                        include: [{
                            model: Country,
                            include: [{
                                model: Region
                            }]
                        }]
                    }]
                },
                {
                    model: ShippingPickupPackage
                }
            ]
        }
        const cards = await ShippingPickup.findAll(options)
        return cards
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getShippingPickup;