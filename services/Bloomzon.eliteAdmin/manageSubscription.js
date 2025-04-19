const ErrorResponse = require("../../utils/errorResponse");
const { EliteMembership } = require("../../models");

const manageSubscription = async (req, next) => {
  try {
    const { id, action } = req.body;

    if (!id || !action) {
      throw new Error("Membership ID and action are required.");
    }

    const membership = await EliteMembership.findOne({ where: { id } });

    if (!membership) {
      throw new Error("No active membership found for this ID.");
    }

    switch (action) {
      case "subscribe":
        membership.status = "active";
        membership.startDate = new Date().toISOString();
        membership.endDate = new Date(
          new Date().setMonth(new Date().getMonth() + membership.duration)
        ).toISOString();
        break;
      case "renew":
        if (membership.status !== "active") {
          throw new Error("Only active memberships can be renewed.");
        }
        membership.endDate = new Date(
          new Date(membership.endDate).setMonth(
            new Date(membership.endDate).getMonth() + membership.duration
          )
        ).toISOString();
        break;
      case "cancel":
        membership.status = "cancelled";
        break;
      default:
        throw new Error(
          "Invalid action. Choose 'subscribe', 'renew', or 'cancel'."
        );
    }

    await membership.save();
    return membership;
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]+/g, ""), 400));
  }
};

module.exports = manageSubscription;
