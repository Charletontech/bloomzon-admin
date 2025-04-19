module.exports = (sequelize, Sequelize) => {
  const eliteBook = sequelize.define("eliteBook", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uploadedBy: {
      type: Sequelize.UUID,
    },
    coverImageUrl: {
      type: Sequelize.STRING,
    },
    bookUrl: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    bookDescription: {
      type: Sequelize.STRING,
    },
    genre: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    language: {
      type: Sequelize.STRING,
    },
    bookPrice: {
      type: Sequelize.INTEGER,
    },
    totalPages: {
      type: Sequelize.INTEGER,
    },
    dimension: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    publisherName: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    publicationDate: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    stickyNotes: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    pageFlipOption: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    authorName: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    authorDescription: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    authorImageUrl: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
  });

  return eliteBook;
};
