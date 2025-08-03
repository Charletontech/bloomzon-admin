module.exports = (sequelize, Sequelize) => {
  const Follower = sequelize.define("reels_followers", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    followerId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "reel_users",
        key: "userId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    followingId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "reel_users",
        key: "userId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  });

  Follower.associate = (models) => {
    Follower.belongsTo(models.ReelUsers, {
      foreignKey: "followerId",
      targetKey: "userId",
      as: "follower",
    });

    Follower.belongsTo(models.ReelUsers, {
      foreignKey: "followingId",
      targetKey: "userId",
      as: "following",
    });
  };
  return Follower;
};
