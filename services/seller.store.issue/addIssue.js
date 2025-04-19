const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssue, SellerBStore} = require("../../models");


const addIssue = async (req) => {
    try {

        const card = await  SellerBStore.findOne({
            where: [{
                id : req.body.sellerStoreId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The store  ${req.body.sellerStoreId} was not found`,  401 );
        }
        if(!card.UserId == req.user.id){
            throw new ErrorResponse(`The store ${req.body.sellerStoreId} is not yours`,  401 );
        }

        return SellerBStoreIssue.create({ ...req.body, UserId: req.user.id, SellerBStoreId: req.body.sellerStoreId });
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addIssue;