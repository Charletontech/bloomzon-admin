const ErrorResponse = require("../../utils/errorResponse");
const {PaymentOption, Notification} = require("../../models");


const addPaymentOption = async (req) => {
    try {
        const card = await  PaymentOption.findAll({
            where: [{
                name: req.body.name,
                type: req.body.type,
                number: req.body.number,
                duty: req.body.duty
            }]
        })
        if(card.length>0){
            throw new ErrorResponse(`The payment option ${req.body.number} already exist`,  401 );
        }
        await Notification.create({
            UserId: req.user.id,
            message: `You have added a payment option`,
            category: "payment",
        });
        return PaymentOption.create({...req.body, UserId: req.user.id});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addPaymentOption;