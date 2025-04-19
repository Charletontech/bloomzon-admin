const {User} = require("../../models");

const getUser = async (req) => {
  const user = await User.findByPk(req.query.userId);
  return {
    user
  };
};

module.exports = getUser;
