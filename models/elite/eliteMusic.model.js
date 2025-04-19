module.exports = (sequelize, Sequelize) => {
  const eliteMusic = sequelize.define("eliteMusic", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    uploadedBy: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    trackName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    trackDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    musicUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    thumbnailUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    trackDuration: {
      type: Sequelize.STRING,
    },
    artistName: {
      type: Sequelize.STRING,
    },
    albumName: {
      type: Sequelize.STRING,
    },
    genre: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
    releaseDate: {
      type: Sequelize.STRING,
    },
    approvalStatus: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return eliteMusic;
};
