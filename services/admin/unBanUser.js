const {User} = require("../../models");

const unBanUser = async (req) => {
  const user = await User.findByPk(req.query.userId);
  user.update({
    adminBanned: false
  })
  return {
    user
  };
};

module.exports = unBanUser;
