module.exports = (sequelize, Sequelize) => {
  const ReelsNotificationSettings = sequelize.define(
    "reels_notification_settings",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: { type: Sequelize.UUID, allowNull: false },
      likes: { type: Sequelize.BOOLEAN, defaultValue: true },
      comments: { type: Sequelize.BOOLEAN, defaultValue: true },
      newFollowers: { type: Sequelize.BOOLEAN, defaultValue: true },
      newPosts: { type: Sequelize.BOOLEAN, defaultValue: true },
    }
  );

  ReelsNotificationSettings.associate = (models) => {
    ReelsNotificationSettings.belongsTo(models.ReelUsers, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return ReelsNotificationSettings;
};
