const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssue} = require("../../models");


const removeIssue = async (req) => {
    try {
        const card = await SellerBStoreIssue.findOne({
            where: [{
                id : req.body.issueId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The store issue ${req.body.issueId} was not found`,  401 );
        }
        const result = card.title
        await card.destroy();

        return `The store issue ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeIssue;