module.exports = (sequelize, Sequelize) => {
  const Discount = sequelize.define("Discount", {
    discountId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    discountProductId: {
      type: Sequelize.UUID,
      defaultValue: null,
    },
    discountType: {
      type: Sequelize.ENUM("percentage", "fixed"),
      allowNull: false,
    },
    discountAmount: {
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
    eligibleCountries: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    eligibleRegions: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Discount;
};
