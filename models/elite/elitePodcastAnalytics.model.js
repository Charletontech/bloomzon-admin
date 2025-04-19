module.exports = (sequelize, Sequelize) => {
  const elitePodcastAnalytics = sequelize.define("elitePodcastAnalytics", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    viewerId: {
      type: Sequelize.STRING,
    },
    podcastEpisodeId: {
      type: Sequelize.UUID,
    },
    viewerCountry: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    durationListened: {
      type: Sequelize.STRING,
    },
    completedPlaying: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return elitePodcastAnalytics;
};
