const {Withdraw, User} = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");
const {hideUser} = require("../../utils/hideFields");

const getWithdrawalHistory = async ({ user, query }) => {
  const page = parseInt(query?.page || "1");

  const limit = parseInt(query?.limit || "24");

  const skip = (page - 1) * limit;

  const reqQuery = query?.status ? { status: query?.status } : {};

  try {
    const withdrawalHistory = await Withdraw.findAll({ 
      where: [reqQuery, {"UserId": user.id}],
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
    const totalCount = await Withdraw.count({ 
      where: [reqQuery, {"userId": user.id}],
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { withdrawalHistory, totalPages, totalCount };
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      throw new ErrorResponse("Invalid user ID", 400);
    }

    throw new ErrorResponse("Error fetching withdrawal history", 500);
  }
};

module.exports = getWithdrawalHistory;
