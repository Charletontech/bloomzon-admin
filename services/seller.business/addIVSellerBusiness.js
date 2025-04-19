const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusiness, Notification, Country} = require("../../models");


const addIVSellerBusiness = async (req) => {
    try {

        const check_sellerBusiness = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!check_sellerBusiness){
            throw new ErrorResponse(`The seller business ${req.body.sellerBusinessId} not found`,  401 );
        }
        
        if(!check_sellerBusiness.UserId == req.user.id){
            throw new ErrorResponse(`The seller business registration ${req.body.sellerBusinessId} does not belong to you`,  401 );
        }

        const check_ivCountryOfIssue = await  Country.findByPk(req.body.ivCountryOfIssue)
        if(!check_ivCountryOfIssue){
            throw new ErrorResponse(`The country of issue ${req.body.ivCountryOfIssue} not found`,  401 );
        }

        return check_sellerBusiness.update({...req.body, phase: 2});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addIVSellerBusiness;