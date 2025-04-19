const ErrorResponse = require("../../utils/errorResponse");
const {User, Variable, Referalearning, Transaction, Notification} = require("../../models");

const getBonus = async (req, user) => {
    try {
        const settings = await Variable.findOne({});

        const referAmount = parseFloat(settings?.referal) || 1;

        let referal = await User.findOne({ where: [{referralCode: user.referredBy}] })
        if (!referal || !referal.isVerified) {
            throw new ErrorResponse(`The user has not been verified`,  401 );
        }
        if (user.referralPaid == false) {
            const newWallet = referal.wallet + referAmount;
            const newRefralWallet = referal.referrerAmountEarned + referAmount;

            user.update({
                referralPaid: true
            })

            referal.update({
                wallet: newWallet,
                referrerAmountEarned: newRefralWallet,
            })

            const refer = await Referalearning.create(
                [
                    {
                        earn: referAmount,
                        userId: user.id,
                        referree: referal.id,
                    },
                ]
            );

            await Transaction.create(
                [
                    {
                        category: "referral",
                        description: `referral bonus`,
                        amount: referAmount,
                        userId: user.id,
                        metadata:  refer.id,
                    },
                ],
            );

            await Notification.create({
                UserId: referal.id,
                message: `You earned ${referAmount} for referral completion`,
                category: "referral",
            });
        }else{
            throw new ErrorResponse(`Bonus has been disbursed before now`,  401 );
        }

        return user
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getBonus;