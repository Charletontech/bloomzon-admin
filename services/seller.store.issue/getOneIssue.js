const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssue, SellerBStore, User, SellerBStoreIssueMail, SellerBStoreIssueChat} = require("../../models");


const getOneIssue = async (req) => {
    try {
        let options = {
            
        }
        options.id = req.query.issueId
        
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

module.exports = getOneIssue;