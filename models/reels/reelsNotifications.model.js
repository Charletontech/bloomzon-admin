module.exports = (sequelize, Sequelize) => {
  const ReelsNotifications = sequelize.define("reels_notifications", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: { type: Sequelize.UUID, allowNull: false },
    type: {
      type: Sequelize.ENUM("like", "comment", "follow", "post"),
      allowNull: false,
    },
    message: { type: Sequelize.STRING, allowNull: false },
    isRead: { type: Sequelize.BOOLEAN, defaultValue: false },
  });

  ReelsNotifications.associate = (models) => {
    ReelsNotifications.belongsTo(models.ReelUsers, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return ReelsNotifications;
};
