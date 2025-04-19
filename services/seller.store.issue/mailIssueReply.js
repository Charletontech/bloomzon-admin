const ErrorResponse = require("../../utils/errorResponse");
const {SellerBStoreIssueMail, SellerBStoreIssue, SellerBStore, User} = require("../../models");
const s3Upload = require("../../utils/s3.upload");
const sendEmail = require("../../utils/sendEmail");

const mailIssueReply = async (req) => {
    try {

        const card = await  SellerBStoreIssueMail.findOne({
            where: [{
                id : req.body.issueMailId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The store issue mail  ${req.body.issueId} was not found`,  401 );
        }
        
        const receiver = card.UserId

        const card1 = await  SellerBStoreIssue.findOne({
            where: [{
                id : card.SellerBStoreIssueId
            }]
        })
        if(!card1){
            throw new ErrorResponse(`The store issue  ${card.SellerBStoreIssueId} was not found`,  401 );
        }
        

        const card2 = await  SellerBStore.findOne({
            where: [{
                id : card1.SellerBStoreId
            }]
        })
        if(!card2){
            throw new ErrorResponse(`The store  ${card1.SellerBStoreId} was not found`,  401 );
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

        await sendEmail({
            email: card.email,
            subject: "Issues Reply",
            body: req.body.message,
        });

        return SellerBStoreIssueMail.create({ phone: card.phone, message: req.body.message, email: card.email, UserId: receiver, SellerBStoreIssueId: card.SellerBStoreIssueId, files: images, type: 'reply', replyBy: req.user.id });

    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = mailIssueReply;