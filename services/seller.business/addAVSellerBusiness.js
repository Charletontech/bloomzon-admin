const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusiness, Notification, Country} = require("../../models");


const addAVSellerBusiness = async (req) => {
    try {

        const check_sellerBusiness = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!check_sellerBusiness){
            throw new ErrorResponse(`The seller business ${req.body.sellerBusinessId} not found`,  401 );
        }
        if(!check_sellerBusiness.UserId == req.user.id){
            throw new ErrorResponse(`The seller business registration ${req.body.sellerBusinessId} does not belong to you`,  401 );
        }

        const check_ivCountryOfIssue = await  Country.findByPk(req.body.avResidential)
        if(!check_ivCountryOfIssue){
            throw new ErrorResponse(`The country of residence ${req.body.avResidential} not found`,  401 );
        }

        return check_sellerBusiness.update({...req.body, SellerBusinessId: req.body.sellerBusinessId, phase: 3});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addAVSellerBusiness;