const {Withdraw, User, Transaction, Notification}  = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const processWithdrawal = async ({ withdrawalId, status, trxHash }, res, next) => {
  
  try {
    if (status != "declined" && !trxHash)
      return next(new ErrorResponse("Transaction hash is required", 400));
    const withdrawal = await Withdraw.findByPk(withdrawalId);

    if (!withdrawal) {
      return next(new ErrorResponse("Withdrawal not found", 404));
    }

    if (withdrawal.status !== "pending") {
      return next(new ErrorResponse("Withdrawal has already been processed", 400));
    }


    if (status === "declined") {
      // Return back to the user if status is "declined"
      const user = await User.findByPk(withdrawal.UserId);

      if (user) {
        await user.update({ 
          wallet: user.wallet + withdrawal.amount
        });

        await Transaction.create(
          
            {
              category: "reversal",
              description: `Reversal of ${withdrawal.amount} for withdrawal with reference - ${withdrawal.reference}`,
              amount: Number(withdrawal.amount),
              UserId: user.id,
            },
          
        );

        await Notification.create(
          
            {
              category: "reversal",
              message: `Reversal of ${withdrawal.amount} for withdrawal with reference - ${withdrawal.reference}`,
              UserId: user.id,
            },
          
        );
      } else {
        return next(new ErrorResponse("User not found", 404));
      }
    }

    if (status != "declined") {

      await withdrawal.update({ 
        trxHash,
        status,
        updatedAt: Date.now()
      });
      await Notification.create(
        
          {
            category: "withdrawal",
            message: `Withdrawal of ${withdrawal.amount} for withdrawal with reference - ${withdrawal.reference} was successful`,
            UserId: withdrawal.UserId,
          },
        
      );
    }else{
      await withdrawal.update({ 
        status,
        updatedAt: Date.now()
      });
      await Notification.create(
        
          {
            category: "withdrawal",
            message: `Withdrawal of ${withdrawal.amount} for withdrawal with reference - ${withdrawal.reference} was successful`,
            UserId: withdrawal.UserId,
          },
        
      );
    }

    return withdrawal;
  } catch (error) {
    console.error(error);
    throw new ErrorResponse(
      "Error processing withdrawal",
      error.statusCode || 500
    );
  }
};

module.exports = processWithdrawal;
