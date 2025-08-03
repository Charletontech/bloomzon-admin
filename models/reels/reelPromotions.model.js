module.exports = (sequelize, Sequelize) => {
  const reelPromotions = sequelize.define(
    "reelPromotions",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      videoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "reels",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      dailyBudget: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      ageRange: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      gender: {
        type: Sequelize.ENUM("all", "male", "female"),
        defaultValue: "all",
      },
      interests: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "reelPromotions",
      timestamps: true,
    }
  );

  reelPromotions.associate = (models) => {
    reelPromotions.belongsTo(models.Reels, {
      foreignKey: "videoId",
      targetKey: "id",
      as: "reel",
    });
  };

  return reelPromotions;
};
