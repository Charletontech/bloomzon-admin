module.exports = (sequelize, Sequelize) => {
  const ReferalEarning = sequelize.define("Referalearnings", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    earn: {
        type: Sequelize.INTEGER
    },
    referree: {
        type: Sequelize.INTEGER
    }
  });

  return ReferalEarning;
};