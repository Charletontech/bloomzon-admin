const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");
const { pwd } = require("../../utils/auth");
const crypto = require("crypto");
const { Op } =  require('@sequelize/core');

const resetPassword = async (req) => {

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
 

  const newPassword = await pwd(req.body.password);
  await user.update({
    password: newPassword,
    verificationToken: null,
    verificationTokenExpire: null
  });

  return user;
};

module.exports = resetPassword;
