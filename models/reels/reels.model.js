module.exports = (sequelize, Sequelize) => {
  const Reels = sequelize.define("reels", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
    videoUrl: { type: Sequelize.STRING, allowNull: false },
    keywords: { type: Sequelize.JSON, defaultValue: null },
    productId: { type: Sequelize.UUID, allowNull: false },
    productName: { type: Sequelize.STRING, allowNull: false },
    productCategory: { type: Sequelize.STRING, allowNull: false },
    productSubCategory: { type: Sequelize.STRING, defaultValue: null },
    locations: { type: Sequelize.JSON, defaultValue: null },
    audience: {
      type: Sequelize.ENUM("everyone", "followers", "only-you"),
      defaultValue: "everyone",
      allowNull: false,
    },
    moreOptions: { type: Sequelize.JSON, allowNull: false },
    likesCount: { type: Sequelize.INTEGER, defaultValue: 0 },
    viewsCount: { type: Sequelize.INTEGER, defaultValue: 0 },
    commentsCount: { type: Sequelize.INTEGER, defaultValue: 0 },
    salesCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isPremiumReel: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  Reels.associate = (models) => {
    Reels.hasOne(models.ReelPromotions, {
      foreignKey: "videoId",
      sourceKey: "id",
      as: "promotion",
    });

    Reels.hasMany(models.ReelComments, {
      foreignKey: "reelId",
      as: "comments",
    });

    Reels.belongsTo(models.ReelUsers, {
      foreignKey: "userId",
      targetKey: "userId",
      as: "user",
    });

    Reels.hasMany(models.ReelSales, {
      foreignKey: "reelId",
      as: "sales",
    });
  };

  return Reels;
};
