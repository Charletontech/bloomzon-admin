const {User} = require("../../models");

const activateUser = async (req) => {
  const user = await User.findByPk(req.query.userId);
  user.update({
    adminLocked: false
  })
  return {
    user
  };
};

module.exports = activateUser;