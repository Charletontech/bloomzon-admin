module.exports = (sequelize, Sequelize) => {
  const EliteMembership = sequelize.define("EliteMembership", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
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
    duration: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
  status: {
  type: Sequelize.STRING,
  allowNull: false,
  validate: {
    isIn: [["active", "expired", "cancelled"]],
  },
  defaultValue: "active",
}
    freeDeliveryEligibility: {
      type: Sequelize.STRING,
      allowNull: false,
        validate: {
    isIn: [["eligible", "not eligible"]],
  },
      defaultValue: "eligible",
    },
    discountEligibility: {
      type: Sequelize.STRING,
      allowNull: false,
       validate: {
    isIn: [["eligible", "not eligible"]],
  },
      defaultValue: "eligible",
    },
    walletBalance: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    stateProvince: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return EliteMembership;
};
