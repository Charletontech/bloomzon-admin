const {
    viewAllTransactionByCategory,
    viewAllTransactionByDate,
    viewAllTransactions,
    withdraw,
    getWithdrawalHistory,
    getAllWithdrawal,
    processWithdrawal,
} = require("../services/transaction");

const asyncHandler = require("../middleware/async");

  
exports.viewAllTransactions = asyncHandler(async (req, res, next) => {
    const transactions = await viewAllTransactions(req, res, next);
    res.status(200).json({
      success: true,
      data: transactions.transactions,
      totalPages: transactions.totalPages,
    });
});
  
exports.viewAllTransactionByCategory = asyncHandler(async (req, res, next) => {
    const transactions = await viewAllTransactionByCategory(req, res, next);
  
    res.status(200).json({
      success: true,
      data: transactions,
    });
});
  
exports.viewAllTransactionByDate = asyncHandler(async (req, res, next) => {
    const transactions = await viewAllTransactionByDate(req, res, next);
    res.status(200).json({
      success: true,
      data: transactions,
    });
});
  
exports.withdraw = asyncHandler(async (req, res, next) => {
    const data = await withdraw(req, res, next);
    res.status(200).json({
      success: true,
      data,
    });
});
  
exports.getWithdrawalHistory = asyncHandler(async (req, res, next) => {
    const data = await getWithdrawalHistory({
      user: req.user,
      query: req?.query,
    }, res, next);
    res.status(200).json({
      success: true,
      data,
    });
});
  
exports.getAllWithdrawal = asyncHandler(async (req, res, next) => {
    const data = await getAllWithdrawal(req.query, res, next);
    res.status(200).json({
      success: true,
      data,
    });
});
  
exports.processWithdrawal = asyncHandler(async (req, res, next) => {
    const data = await processWithdrawal(req.body, res, next);
    res.status(200).json({
      success: true,
      data,
    });
});
