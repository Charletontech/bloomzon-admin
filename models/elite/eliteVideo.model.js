module.exports = (sequelize, Sequelize) => {
  const eliteVideo = sequelize.define("eliteVideo", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    uploadedBy: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    videoUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    thumbnailUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subtitleUrl: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    category: {
      type: Sequelize.STRING,
    },
    directors: {
      type: Sequelize.STRING,
    },
    starring: {
      type: Sequelize.STRING,
    },
    genres: {
      type: Sequelize.STRING,
    },
    audioLanguage: {
      type: Sequelize.STRING,
    },
    producers: {
      type: Sequelize.STRING,
    },
    studio: {
      type: Sequelize.STRING,
    },
    approvalStatus: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return eliteVideo;
};
