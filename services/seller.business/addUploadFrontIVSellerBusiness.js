const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusiness} = require("../../models");
const s3Upload = require("../../utils/s3.upload");

const addUploadFrontIVSellerBusiness = async (req) => {
    try {

        const check_sellerBusiness = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!check_sellerBusiness){
            throw new ErrorResponse(`The seller business ${req.body.sellerBusinessId} not found`,  401 );
        }
        
        if(!check_sellerBusiness.UserId == req.user.id){
            throw new ErrorResponse(`The seller business registration ${req.body.sellerBusinessId} does not belong to you`,  401 );
        }

        let ivProveFront = "";
        if (req.file) {
            const file = req.file;
            ivProveFront = await s3Upload(
                file.buffer,
                file.originalname,
                file.mimetype,
                "ivProveFront_"+req.body.sellerBusinessId
            );
        }

        return check_sellerBusiness.update({ phase: 7, ivProveFront: ivProveFront});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addUploadFrontIVSellerBusiness;
