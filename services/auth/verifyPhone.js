const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");
const crypto = require("crypto");
const { Op } =  require('@sequelize/core');

const verifyUserPhone = async (req) => {
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

  user.update({
    isVerified: true,
    verificationToken: null,
    verificationTokenExpire: null
  })

};

module.exports = verifyUserPhone;