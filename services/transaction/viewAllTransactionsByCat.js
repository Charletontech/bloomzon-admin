const {Transaction, User} = require("../../models");
const { hideUser } = require("../../utils/hideFields");

const viewAllTransactionByCategory = async (req) => {
  const { category } = req.query;

  const matchStage = category ? {category} : {}

  const transactions = await Transaction.findAll({
    where: [matchStage],
    include: [
      {
        model: User,
        attributes: {exclude: await hideUser()},
      }
    ],
  });

  return transactions;
};

module.exports = viewAllTransactionByCategory;
