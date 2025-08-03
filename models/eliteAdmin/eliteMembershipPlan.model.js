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
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("active", "expired", "cancelled"),
      allowNull: false,
      defaultValue: "active",
    },
    freeDeliveryEligibility: {
      type: Sequelize.ENUM("eligible", "not eligible"),
      allowNull: false,
      defaultValue: "eligible",
    },
    discountEligibility: {
      type: Sequelize.ENUM("eligible", "not eligible"),
      allowNull: false,
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
