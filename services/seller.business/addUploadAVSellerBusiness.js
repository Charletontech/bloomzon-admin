const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusiness} = require("../../models");
const s3Upload = require("../../utils/s3.upload");

const addUploadAVSellerBusiness = async (req) => {
    try {

        const check_sellerBusiness = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!check_sellerBusiness){
            throw new ErrorResponse(`The seller business ${req.body.sellerBusinessId} not found`,  401 );
        }
        
        if(!check_sellerBusiness.UserId == req.user.id){
            throw new ErrorResponse(`The seller business registration ${req.body.sellerBusinessId} does not belong to you`,  401 );
        }

        let avProve = "";
        if (req.file) {
            const file = req.file;
            avProve = await s3Upload(
                file.buffer,
                file.originalname,
                file.mimetype,
                "avProve_"+req.body.sellerBusinessId
            );
        }

        return check_sellerBusiness.update({ phase: 9, avProve: avProve});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addUploadAVSellerBusiness;