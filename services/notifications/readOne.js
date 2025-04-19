const ErrorResponse = require("../../utils/errorResponse");
const {Notification, User} = require("../../models");
const { hideUser } = require("../../utils/hideFields");

const readOneNotification = async (req, res, next) => {
  const notice = await Notification.findByPk(req.params.id, 
    {
      include: [
        {
          model: User,
          attributes: {exclude: await hideUser()},
        }
      ],
    }
  )
  if (!notice)
    return next(new ErrorResponse(`Notice ${req.params.id} not found`, 404))


  await notice.update({
    isRead: true
  })
  return notice;
};

module.exports = readOneNotification;
