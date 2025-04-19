const {Withdraw, User} = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");
const {hideUser} = require("../../utils/hideFields");

const getAllWithdrawals = async ({ status, page = 1, limit = 20 }, res, next) => {
  try {
    const query = status ? { status } : {};

    const skip = (page - 1) * limit;

    const withdrawals = await Withdraw.findAll({
      where: [query],
      include: [
        {
          model: User,
          attributes: {exclude: await hideUser()},
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ],
      offset: skip,
      limit: parseInt(limit)
    })

    const totalCount = await Withdraw.count(query);

    const totalPages = Math.ceil(totalCount / limit);

    const totalPending = await Withdraw.count({ where: [{status: "pending"}] });

    const totalCompleted = await Withdraw.count({
      where: [{status: "completed"}],
    });

    const totalDeclined = await Withdraw.count({ where: [{status: "declined"}] });

    return {
      withdrawals,
      page: parseInt(page),
      totalPages,
      stat: { totalPending, totalCompleted, totalDeclined },
    };
  } catch (error) {
    console.error(error);
    throw new ErrorResponse("Error fetching all withdrawals", 500);
  }
};

module.exports = getAllWithdrawals;
