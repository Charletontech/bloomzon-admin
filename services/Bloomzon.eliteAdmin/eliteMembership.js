const ErrorResponse = require("../../utils/errorResponse");
const { EliteMembership } = require("../../models");

const eliteMembership = async (req, next) => {
  try {
    const {
      startDate,
      endDate,
      duration,
      email,
      name,
      stateProvince,
      country,
    } = req.body;

    const newMembership = await EliteMembership.create({
      startDate,
      endDate,
      duration,
      email,
      name,
      stateProvince,
      country,
    });

    return newMembership;
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = eliteMembership;
