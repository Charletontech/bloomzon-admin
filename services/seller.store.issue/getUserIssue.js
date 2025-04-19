const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssue, SellerBStore, User, SellerBStoreIssueMail, SellerBStoreIssueChat} = require("../../models");


const getUserIssue = async (req) => {
    try {
        let options = {
            
        }
        options.UserId = req.query.userId
        
        const card = await SellerBStoreIssue.findOne({
            where: [options],
            include: [
                {
                    model: User
                },
                {
                    model: SellerBStore
                },
                {
                    model: SellerBStoreIssueMail
                },
                {
                    model: SellerBStoreIssueChat
                }
            ],
        })
        return card
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getUserIssue;