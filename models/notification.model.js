module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define("Notifications", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    message: {
        type: Sequelize.STRING
    },
    isRead: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    category: {
        type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING
    }
  });

  return Notification;
};