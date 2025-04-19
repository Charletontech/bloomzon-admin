const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusiness, Notification, Country} = require("../../models");


const addSPISellerBusiness = async (req) => {
    try {
        const check_spiCountryOfCitizenship = await  Country.findByPk(req.body.spiCountryOfCitizenship)
        if(!check_spiCountryOfCitizenship){
            throw new ErrorResponse(`The country of citizenship ${req.body.spiCountryOfCitizenship} not found`,  401 );
        }
        const check_spiCountryOfBirth = await  Country.findByPk(req.body.spiCountryOfBirth)
        if(!check_spiCountryOfBirth){
            throw new ErrorResponse(`The country of birth ${req.body.spiCountryOfBirth} not found`,  401 );
        }
       
        await Notification.create({
            UserId: req.user.id,
            message: `You have intiated a business, kindly follow through to complete the registration process`,
            category: "business",
        });
        return SellerBusiness.create({...req.body, SellerBusinessId: req.body.sellerBusinessId, UserId: req.user.id, phase: 1});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addSPISellerBusiness;