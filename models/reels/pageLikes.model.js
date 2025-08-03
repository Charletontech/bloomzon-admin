module.exports = (sequelize, Sequelize) => {
  const PageLikes = sequelize.define(
    "reels_page_likes",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      liked: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: "reels_users",
        //   key: "userId",
        // },
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
      },
      likedBy: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: "reels_users",
        //   key: "userId",
        // },
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["liked", "likedBy"],
        },
      ],
    }
  );

  // PageLikes.associate = (models) => {
  //   PageLikes.belongsTo(models.ReelUsers, {
  //     foreignKey: "liked",
  //     as: "pageLiked",
  //   });

  //   PageLikes.belongsTo(models.ReelUsers, {
  //     foreignKey: "likedBy",
  //     as: "liker",
  //   });
  // };

  return PageLikes;
};
