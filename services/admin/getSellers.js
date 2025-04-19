const {User} = require("../../models");

const getSellers = async (req) => {
  const user = await User.findAll({
    where: {
        role: 'seller'
    }
  });
  return {
    user
  };
};

module.exports = getSellers;