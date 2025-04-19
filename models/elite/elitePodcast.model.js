module.exports = (sequelize, Sequelize) => {
  const elitePodcast = sequelize.define("elitePodcast", {
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
    coverImageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    category: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
  });
  return elitePodcast;
};
