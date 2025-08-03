module.exports = (sequelize, Sequelize) => {
  const ReelSales = sequelize.define("reels_sales", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    reelId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    productId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    productName: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    sellerId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    pageName: {
      type: Sequelize.UUID,
      defaultValue: null,
      allowNull: true,
    },
    amountSold: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    quantitySold: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    sellerFeeType: {
      type: Sequelize.ENUM("commission", "flat"),
      allowNull: false,
    },
    sellerFee: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });

  ReelSales.associate = (models) => {
    ReelSales.belongsTo(models.Reels, {
      foreignKey: "reelId",
      as: "reel",
    });
  };

  return ReelSales;
};
