const {Transaction, User} = require("../../models");
const { hideUser } = require("../../utils/hideFields");

const viewAllTransactions = async (req) => {
  const { page = 1, limit = 24 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const { category } = req.query;

  let filter = { UserId: req.user.id };

  if (
    category &&
    category !== undefined &&
    category !== "undefined" &&
    category !== "all"
  )
    filter.category = category;

  const query = await Transaction.findAll({
    where: [filter],
    order: [
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: User,
        attributes: {exclude: await hideUser()},
      }
    ],
    offset: skip,
    limit: parseInt(limit)
  })

  const countPromise = Transaction.count({ where: [{UserId: req.user.id}] });

  const [transactions, count] = await Promise.all([
    query,
    countPromise,
  ]);

  const totalPages = Math.ceil(count / parseInt(limit));

  return {
    transactions,
    totalPages,
  };
};

module.exports = viewAllTransactions;
