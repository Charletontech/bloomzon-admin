const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssue, SellerBStore, User} = require("../../models");


const editIssue = async (req) => {
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

        const cards = await  SellerBStoreIssue.findOne({
            where: [{
                id : req.body.issueId
            }]
        })
        if(!cards){
            throw new ErrorResponse(`The store issues  ${req.body.issueId} is not yours`,  401 );
        }
        
        const result = card.update({
            SellerBStoreId: req.body.sellerStoreId,
            title: req.body.title,
            description: req.body.description,
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editIssue;