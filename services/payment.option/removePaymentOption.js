const ErrorResponse = require("../../utils/errorResponse");
const {PaymentOption, Notification} = require("../../models");


const removePaymentOption = async (req) => {
    try {
        const card = await PaymentOption.findOne({
            where: [{
                id : req.body.paymentOptionId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The payment option ${req.body.paymentOptionId} was not found`,  401 );
        }
        const result = card.name + " " + card.number
        await card.destroy();

        await Notification.create({
            UserId: card.UserId,
            message: `Your payment option ${result} has been removed`,
            category: "payment",
        });

        return `The payment option ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removePaymentOption;