const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssueMail, SellerBStoreIssue, SellerBStore, User} = require("../../models");
const s3Upload = require("../../utils/s3.upload");

const mailIssue = async (req) => {
    try {
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

        let images = {}
        if (!req.files || req.files.length === 0) {
            throw new ErrorResponse("Image submission is required", 400);
        }
        let i6 = -1;
        const uploadPromises = req.files.map(async (file) => {
            i6 += 1;
            const result = await s3Upload(
              file.buffer,
              file.originalname,
              file.mimetype,
              images_holder[i6]
            );
            return result;
        });
        images = await Promise.all(uploadPromises);

        return SellerBStoreIssueMail.create({ ...req.body, UserId: req.user.id, SellerBStoreIssueId: req.body.issueId, files: images, type: 'sent', replyBy: null });

    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = mailIssue;