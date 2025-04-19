const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssue, SellerBStore, SellerBStoreIssueChat} = require("../../models");


const addIssueChatSend = async (req) => {
    try{
        const card1 = await  SellerBStoreIssue.findOne({
            where: [{
                id : req.body.issueId
            }]
        })
        if(!card1){
            throw new ErrorResponse(`The store issue  ${req.body.issueId} was not found`,  401 );
        }
        if(!card1.UserId == req.user.id){
            throw new ErrorResponse(`The store issue ${req.body.issueId} is not yours`,  401 );
        }

        const card2 = await  SellerBStore.findOne({
            where: [{
                id : card1.SellerBStoreId
            }]
        })
        if(!card2){
            throw new ErrorResponse(`The store  ${card1.SellerBStoreId} was not found`,  401 );
        }
        if(!card2.UserId == req.user.id){
            throw new ErrorResponse(`The store ${card1.SellerBStoreId} is not yours`,  401 );
        }

        return SellerBStoreIssueChat.create({ ...req.body, UserId: req.user.id, SellerBStoreIssueId: req.body.issueId, files: [], type: 'sent', replyBy: null, massageType: 'text' });

    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addIssueChatSend;