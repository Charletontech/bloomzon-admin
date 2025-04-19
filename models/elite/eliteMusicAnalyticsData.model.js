module.exports = (sequelize, Sequelize) => {
  const eliteMusicAnalyticsData = sequelize.define("eliteMusicAnalyticsData", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    musicId: {
      type: Sequelize.UUID,
    },
    durationListened: {
      type: Sequelize.INTEGER,
    },
    finishedListening: {
      type: Sequelize.BOOLEAN,
    },
  });

  return eliteMusicAnalyticsData;
};
