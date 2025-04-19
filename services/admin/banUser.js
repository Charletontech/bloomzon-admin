const {User} = require("../../models");

const banUser = async (req) => {
  const user = await User.findByPk(req.query.userId);
  user.update({
    adminBanned: true
  })
  return {
    user
  };
};

module.exports = banUser;
