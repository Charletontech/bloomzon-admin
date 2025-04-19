const ErrorResponse = require("../../utils/errorResponse");
const {User} = require("../../models");


const { matchpassword, incrementLoginAttempts } = require("../../utils/auth");

const login = async (req) => {
  const { email, password } = req.body;

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
  // Check if password matches
  const isMatch = await matchpassword(password, user);

  if (!isMatch) {
    const newUser = await incrementLoginAttempts(user);
    if (newUser.isLocked) {
      throw new ErrorResponse(
        `Your Account is locked due to too many attempts, your account will be unlocked at ${newUser.lockUntil?.toLocaleTimeString()} on ${newUser.lockUntil?.toDateString()}`,
        401
      );
    }
    throw new ErrorResponse(`Invalid Credentials`, 401);
  } else {
    const lastLogin = Date.now();
    const loginAttempts = 0;
    await user.update({
      lastLogin,
      loginAttempts
    });

    return user;
  }
};

module.exports = login;
