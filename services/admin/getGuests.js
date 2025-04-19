const {User} = require("../../models");

const getGuests = async (req) => {
  const user = await User.findAll({
    where: {
        role: 'guest'
    }
  });
  return {
    user
  };
};

module.exports = getGuests;