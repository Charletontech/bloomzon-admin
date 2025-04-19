const ErrorResponse = require("../../utils/errorResponse");
const {PaymentOption, User} = require("../../models");
const { hideUser } = require("../../utils/hideFields");


const getPaymentOption = async (req) => {
    try {
        let options = {}
        options.id = req.query.paymentOptionId
        if(req.user.role == "guest"){
            options.UserId = req.user.id
        }
        const card = await PaymentOption.findOne({
            where: [options],
            include: [{
                model: User,
                attributes: {exclude: await hideUser()},
            }]
        })
        return card
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getPaymentOption;