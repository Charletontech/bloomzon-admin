const ErrorResponse = require("../../utils/errorResponse");
const {PaymentOption, Notification} = require("../../models");


const editPaymentOptionAdmin = async (req) => {
    try {
        const card = await  PaymentOption.findOne({
            where: [{
                id : req.body.paymentOptionId
            }]
        })
        if(!card){
            throw new ErrorResponse(`The payment option ${req.body.paymentOptionId} was not found`,  401 );
        }

        const result = card.update({
            status: req.body.status
        });

        await Notification.create({
            UserId: card.UserId,
            message: `Your payment option has been ${req.body.status}`,
            category: "payment",
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editPaymentOptionAdmin;