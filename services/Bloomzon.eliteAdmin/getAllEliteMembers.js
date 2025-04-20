const ErrorResponse = require("../../utils/errorResponse");
const { EliteMembership } = require("../../models");

const getAllEliteMembers = async (next) => {
  try {
    const members = await EliteMembership.findAll({
      order: [["createdAt", "DESC"]],
    });
    return members;
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = getAllEliteMembers;
