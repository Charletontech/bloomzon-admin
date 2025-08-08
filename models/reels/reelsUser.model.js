module.exports = (sequelize, Sequelize) => {
  const ReelUsers = sequelize.define("reel_users", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: Sequelize.STRING,
      defaultValue: "Not provided",
      allowNull: false,
    },
    pageName: { type: Sequelize.STRING, allowNull: false },
    status: {
      type: Sequelize.ENUM(
        "pending",
        "active",
        "inactive",
        "banned",
        "deactivated"
      ),
      defaultValue: "pending",
      allowNull: false,
    },
    profilePicture: { type: Sequelize.STRING, allowNull: true },
    coverPhoto: { type: Sequelize.STRING, allowNull: true },
    bio: { type: Sequelize.STRING(500), allowNull: true },
    likesCount: { type: Sequelize.INTEGER, defaultValue: 0 },
    followersCount: { type: Sequelize.INTEGER, defaultValue: 0 },
    followingCount: { type: Sequelize.INTEGER, defaultValue: 0 },
    businessLocation: { type: Sequelize.STRING, allowNull: true },
    phone: { type: Sequelize.STRING, allowNull: true },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    accountRegion: { type: Sequelize.STRING, allowNull: true },
    password: { type: Sequelize.STRING, defaultValue: null },
    // isDeactivated: { type: Sequelize.BOOLEAN, defaultValue: false }, redundant with status
    deactivationDate: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    otherSocialAccounts: { type: Sequelize.JSON, allowNull: true },
  });

  ReelUsers.associate = (models) => {
    ReelUsers.hasMany(models.ReelsNotifications, {
      foreignKey: "userId",
      as: "notifications",
    });

    ReelUsers.hasOne(models.ReelsNotificationSettings, {
      foreignKey: "userId",
      as: "settings",
    });

    ReelUsers.hasMany(models.Reels, {
      foreignKey: "userId",
      as: "reels",
    });

    ReelUsers.hasMany(models.Follower, {
      foreignKey: "followerId",
      as: "following",
    });

    ReelUsers.hasMany(models.Follower, {
      foreignKey: "followingId",
      as: "followers",
    });
  };

  return ReelUsers;
};
