const ErrorResponse = require("../../utils/errorResponse");
const {ShippingPickup, ShippingPickupPackage, User, City, State, Country, Region} = require("../../models");


const getUserShippingPickup = async (req) => {
    try {
        let options = {
            
        }
        options.UserId = req.query.userId
        
        const card = await ShippingPickup.findOne({
            where: [options],
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
            ],
        })
        return card
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getUserShippingPickup;