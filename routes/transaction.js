const express = require("express");
const {
  viewAllTransactionByCategory,
  viewAllTransactionByDate,
  viewAllTransactions,
  withdraw,
  getWithdrawalHistory,
  getAllWithdrawal,
  processWithdrawal,
} = require("../controllers/transaction");

const router = express.Router();

const {
  protect,
  verified,
  authorize,
  isUserPermitted,
  verifyPin
} = require("../middleware/auth");

const {
  validateProcessWithdrawObj,
  validateWithdrawObj,
} = require("../validators/transaction");


router.get("/", protect, verified, viewAllTransactions);

router.post("/withdraw", protect, verified, verifyPin, validateWithdrawObj, withdraw);
router.get(
  "/withdraw",
  protect,
  verified,
  authorize("admin"),
  isUserPermitted("withdraw.view", "withdraw.query"),
  getAllWithdrawal
);
router.put(
  "/withdraw",
  validateProcessWithdrawObj,
  protect,
  verified,
  authorize("admin"),
  isUserPermitted("withdraw.approve", "withdraw.reject"),
  processWithdrawal
);

router.get("/history", protect, verified, getWithdrawalHistory);
router.get("/history-by-date", protect, verified, viewAllTransactionByDate);
router.get("/history-by-category", protect, verified, viewAllTransactionByCategory);


module.exports = router;
