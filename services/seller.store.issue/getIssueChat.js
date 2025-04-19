const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssue, SellerBStore, User, SellerBStoreIssueMail, SellerBStoreIssueChat} = require("../../models");


const getIssueChat = async (req) => {
    try {
        const card = await SellerBStoreIssueChat.findOne({
            where: [{
                id : req.body.sellerStoreId
            }],
            include: [
                {
                    model: User,
                    as: "replyBy",
                },
                {
                    model: User
                },
                {
                    model: SellerBStoreIssue,
                    include: [{ model: SellerBStore }]
                },
                {
                    model: SellerBStoreIssueMail
                }
            ]
        })
        if(!card){
            throw new ErrorResponse(`The store issue chat ${req.body.sellerStoreId} was not found`,  401 );
        }
        
        return card
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getIssueChat;