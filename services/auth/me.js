const {User} = require("../../models");

const getme = async (req) => {
  const user = await User.findByPk(req.user.id);
  return {
    user
  };
};

module.exports = getme;
