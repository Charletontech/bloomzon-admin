module.exports = (sequelize, Sequelize) => {
  const eliteVideosAnalyticsData = sequelize.define(
    "eliteVideosAnalyticsData",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      videoId: {
        type: Sequelize.UUID,
      },
      durationWatched: {
        type: Sequelize.INTEGER,
      },
      finishedWatching: {
        type: Sequelize.BOOLEAN,
      },
    }
  );
  return eliteVideosAnalyticsData;
};
