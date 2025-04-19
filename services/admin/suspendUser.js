const {User} = require("../../models");

const suspendUser = async (req) => {
  const user = await User.findByPk(req.query.userId);
  user.update({
    adminLocked: true
  })
  return {
    user
  };
};

module.exports = suspendUser;