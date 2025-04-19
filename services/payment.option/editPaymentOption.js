const ErrorResponse = require("../../utils/errorResponse");
const {PaymentOption, Notification} = require("../../models");


const editPaymentOption = async (req) => {
    try {
        const card = await  PaymentOption.findOne({
            where: [{
                id : req.body.paymentOptionId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The payment option ${req.body.paymentOptionId} was not found`,  401 );
        }

        const paymentOptionCheck = await  PaymentOption.findAll({
            where: [{
                name : req.body.name
            }]
        })
        if(paymentOptionCheck.length>0){
            throw new ErrorResponse(`A payment option ${req.body.number} already exist`,  401 );
        }

        const result = card.update({
            name: req.body.name,
            type: req.body.type,
            number: req.body.number,
            expiration: req.body.expiration,
            cvv: req.body.cvv,
            rank: req.body.rank,
            duty: req.body.duty,
        });
        await Notification.create({
            UserId: card.UserId,
            message: `Your payment option ${number} has been modified`,
            category: "payment",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editPaymentOption;