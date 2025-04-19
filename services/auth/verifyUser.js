const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");
const crypto = require("crypto");
const { Op } =  require('@sequelize/core');

const verifyUser = async (req) => {
  let token = String(req.body.token);
  const verificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    where: {
      verificationToken,
      verificationTokenExpire: { [Op.gt]: Date.now() },
    }
  });
  if (!user) {
    throw new ErrorResponse("Invalid token", 400);
  }

  await user.update({
    verificationToken: null,
    verificationTokenExpire: null
  })

};

module.exports = verifyUser;