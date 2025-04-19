const {User} = require("../../models");

const getUsers = async (req) => {
  const user = await User.findAll();
  return {
    user
  };
};

module.exports = getUsers;
