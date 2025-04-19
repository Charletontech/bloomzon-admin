const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssue, SellerBStore, SellerBStoreIssueChat} = require("../../models");


const addIssueChatReply = async (req) => {
    try{

        const card = await  SellerBStoreIssueChat.findOne({
            where: [{
                id : req.body.issueChatId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The store issue mail  ${req.body.issueId} was not found`,  401 );
        }

        const card1 = await  SellerBStoreIssue.findOne({
            where: [{
                id : card.SellerBStoreIssueId
            }]
        })
        if(!card1){
            throw new ErrorResponse(`The store issue  ${req.body.issueId} was not found`,  401 );
        }
       

        const card2 = await  SellerBStore.findOne({
            where: [{
                id : card1.SellerBStoreId
            }]
        })
        if(!card2){
            throw new ErrorResponse(`The store  ${card1.SellerBStoreId} was not found`,  401 );
        }
        

        return SellerBStoreIssueChat.create({ ...req.body, UserId: card2.UserId, SellerBStoreIssueId: card.SellerBStoreIssueId, files: images, type: 'reply', replyBy: req.user.id, });

    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addIssueChatReply;