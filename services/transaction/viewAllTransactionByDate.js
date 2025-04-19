const {Transaction, User} = require("../../models");
const { Op } =  require('@sequelize/core');
const { hideUser } = require("../../utils/hideFields");

const viewAllTransactionByDate = async (req) => {
  const { start, end } = req.query;

  const start_date = start ? new Date(start) : null;
  const end_date = end ? new Date(end) : null;


  let transactions;
  if (start_date && end_date) {
    transactions = await Transaction.findAll({
      where: [{
        [Op.and]: [
          { createdAt: {[Op.gte]: start_date}},
          { createdAt: {[Op.lt]: new Date(end_date.getTime() + 24 * 60 * 60 * 1000)} }
        ]
      }],
      include: [
        {
          model: User,
          attributes: {exclude: await hideUser()},
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
       
    });
  } else {
    transactions = await Transaction.findAll({
      include: [
        {
          model: User,
          attributes: {exclude: await hideUser()},
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
  });
}

  return transactions;
};

module.exports = viewAllTransactionByDate;
