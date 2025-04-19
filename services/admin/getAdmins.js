const {User} = require("../../models");

const getAdmins = async (req) => {
  const user = await User.findAll({
    where: {
        role: 'admin'
    }
  });
  return {
    user
  };
};

module.exports = getAdmins;