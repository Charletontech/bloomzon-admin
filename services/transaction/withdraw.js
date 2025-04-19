const {Withdraw, User, Transaction}  = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");
const generateRandomReference = require("../../utils/generateRandomReference");

const withdraw = async (req, res, next) => {
  const { amount } = req.body
  if (Number(amount) <= 0) {
    return next(new ErrorResponse("Invalid withdrawal amount", 400));
  }
  try {

    const user = await User.findByPk(req.user.id);
    if (!user) {
        return next(new ErrorResponse("User not found", 400));
    }
    if(user.wallet < amount){
        return next(new ErrorResponse("Insufficient Balance", 400));
    }
    await user.update({ 
        wallet: user.wallet - amount
    });
    const reference = generateRandomReference()
    const withdrawal = await Withdraw.create({
      reference,
      amount,
      UserId: user.id
    });

    await Transaction.create({
        category: "withdrawal",
        description: `Withdrawal of ${amount} from wallet - ${withdrawal.reference}`,
        amount: Number(amount),
        UserId: user.id,
    });
    return withdrawal;
  } catch (error) {
    console.error(error);
    throw new ErrorResponse(
      "Error processing withdrawal",
      error.statusCode || 500
    );
  }
};

module.exports = withdraw;
