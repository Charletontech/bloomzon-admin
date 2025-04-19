const ErrorResponse = require("../../utils/errorResponse");
const {Notification, User} = require("../../models");
const { hideUser } = require("../../utils/hideFields");

const readAllNotification = async (req, res, next) => {
  const notice = await Notification.findAll({
    where: [{UserId: req.user?.id}],
    include: [
      {
        model: User,
        attributes: {exclude: await hideUser()},
      }
    ],
  })
  if (!notice)
    return next(new ErrorResponse(`User ${req.user?.firstname} doe not have notifications`, 404));
  for (let vc4 = 0; vc4 < notice.length; vc4++) {
    const eachNotice = notice[vc4];
    await eachNotice.update({
      isRead: true
    })
  }
  return notice;
  
};

module.exports = readAllNotification;
