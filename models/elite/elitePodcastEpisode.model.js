module.exports = (sequelize, Sequelize) => {
  const elitePodcastEpisode = sequelize.define("elitePodcastEpisode", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    uploadedBy: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    episodeTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    podcastId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    episodeAudioUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    thumbnailUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genre: {
      type: Sequelize.STRING,
      default: null,
    },
    guestName: {
      type: Sequelize.STRING,
      default: null,
    },
    duration: {
      type: Sequelize.STRING,
      default: null,
    },
    releaseDate: {
      type: Sequelize.STRING,
      default: null,
    },
  });
  return elitePodcastEpisode;
};
