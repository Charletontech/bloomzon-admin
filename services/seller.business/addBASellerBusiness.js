const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusiness, Notification, BPaymentOption, PaymentOption} = require("../../models");


const addBASellerBusiness = async (req) => {
    try {

        const check_sellerBusiness = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!check_sellerBusiness){
            throw new ErrorResponse(`The seller business ${req.body.sellerBusinessId} not found`,  401 );
        }
        
        if(!check_sellerBusiness.UserId == req.user.id){
            throw new ErrorResponse(`The seller business registration ${req.body.sellerBusinessId} does not belong to you`,  401 );
        }

        let cardId = null
        const check_paymentOption = await  PaymentOption.findOne({
            where: [{
                name: req.body.name,
                number: req.body.number,
                type: req.body.type,
                expiration: req.body.expiration,
                cvv: req.body.cvv,
                UserId: req.user.id
            }]
        })
        if(!check_paymentOption){
            const saveCard = await PaymentOption.create({
                name: req.body.name,
                number: req.body.number,
                expiration: req.body.expiration,
                cvv: req.body.cvv,
                type: req.body.type,
                UserId: req.user.id,
            })
            cardId = saveCard.id
        }else{
            cardId = check_paymentOption.id
        }

        const check_sellerBusinessPaymentOption = await  BPaymentOption.findOne({
            where: [{
                SellerBusinessId: req.body.sellerBusinessId,
                PaymentOptionId: cardId
            }]
        })
        if(!check_sellerBusinessPaymentOption){
            await BPaymentOption.create({
                SellerBusinessId: req.body.sellerBusinessId,
                PaymentOptionId: cardId
            })
        }
        return check_sellerBusiness.update({billingAddress: req.body.billingAddress, phase: 4});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addBASellerBusiness;