const cron = require("node-cron");
const { EliteMembership, Discount } = require("../models");
const { Op } = require("sequelize");

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log(
    "🔄 Running scheduled job to expire memberships and discounts..."
  );

  const now = new Date();

  try {
    // Expire Elite Memberships
    const expiredMembers = await EliteMembership.update(
      { status: "expired" },
      {
        where: {
          endDate: { [Op.lt]: now },
          status: "active",
        },
      }
    );
    console.log(
      `${expiredMembers[0]} memberships have been marked as expired.`
    );

    // Deactivate Discounts
    const expiredDiscounts = await Discount.update(
      { isActive: false },
      {
        where: {
          endDate: { [Op.lt]: now },
          isActive: true,
        },
      }
    );
    console.log(
      `${expiredDiscounts[0]} discount campaigns have been made inactive.`
    );

    console.log("✅ Cron job completed successfully");
  } catch (error) {
    console.error("❌ Error in cron job:", error.message);
  }
});
