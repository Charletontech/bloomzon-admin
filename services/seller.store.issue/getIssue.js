const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssue, SellerBStore, User, SellerBStoreIssueMail, SellerBStoreIssueChat} = require("../../models");


const getIssue = async (req) => {
    try {
        let options = {
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
            ]
        }
        const cards = await SellerBStoreIssue.findAll(options)
        return cards
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getIssue;