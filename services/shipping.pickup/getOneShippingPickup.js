const ErrorResponse = require("../../utils/errorResponse");
const {ShippingPickup, ShippingPickupPackage, User} = require("../../models");


const getShippingPickup = async (req) => {
    try {
        let options = {
            
        }
        options.id = req.query.shippingPickupId
        
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

module.exports = getShippingPickup;