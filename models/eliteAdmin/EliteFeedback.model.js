module.exports = (sequelize, Sequelize) => {
  const EliteFeedback = sequelize.define("EliteFeedback", {
    feedbackId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    eliteMemberId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    feedbackMessage: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    feedbackType: {
      type: Sequelize.ENUM("suggestion", "complaint", "praise", "other"),
      defaultValue: "other",
    },
    submittedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    status: {
      type: Sequelize.ENUM("pending", "reviewed", "resolved"),
      defaultValue: "pending",
    },
  });

  return EliteFeedback;
};
