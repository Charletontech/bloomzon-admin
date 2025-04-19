const ErrorResponse = require("../../utils/errorResponse");
const {Notification, User} = require("../../models");
const { hideUser } = require("../../utils/hideFields");

const getAllNotification = async (req) => {
  const { page = 1, limit = 24 } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const notifications = await Notification.findAll({ 
    where: [ { UserId: req.user.id}],
    include: [
      {
        model: User,
        attributes: {exclude: await hideUser()},
      }
    ],
    order: [
      ['createdAt', 'DESC']
    ],
    offset: skip,
    limit: parseInt(limit)
  })
 

  const totalUserNotifications = await Notification.count({
    UserId: req?.user.id,
  });

  const totalPages = Math.ceil(totalUserNotifications / parseInt(limit));

  const totalUnreadNotifications = await Notification.count({
    UserId: req?.user.id,
    isRead: false,
  });

  return {
    notifications,
    totalPages,
    stat: { unread: totalUnreadNotifications },
  };
};

module.exports = getAllNotification;
