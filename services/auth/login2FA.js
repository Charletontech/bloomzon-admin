const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");


const login2FA = async (req) => {
  const { token, email } = req.body;

  // Check for user
  const user = await User.findOne({ where: {email} });


  if (!user) {
    throw new ErrorResponse("Invalid credentials", 401);
  }
  if (user.isLocked) {
    throw new ErrorResponse(
      `Your Account is locked due to too many attempts, your account will be unlocked at ${user.lockUntil?.toLocaleTimeString()} on ${user.lockUntil?.toDateString()}`,
      401
    );
  }
  if (user?.adminBanned) {
    throw new ErrorResponse(
      `Your Account is banned due to suspicious activate, kindly contact support team via mail @ support@bloomzon.com`,
      401
    );
  }
    return user;
};

module.exports = login2FA;
