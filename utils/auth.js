const randomize = require("randomatic");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const speakeasy = require('speakeasy');

async function getVerificationToken() {
    // Generate token
    let tokenCode = randomize("0", 6);
    let expires = '';
  
    // Hash token and set to resetPasswordToken field
    const token = crypto
      .createHash("sha256")
      .update(tokenCode)
      .digest("hex");
  
    // Set expire
    expires = Date.now() + 10 * 60 * 1000;
  
    return {token, expires, tokenCode};
};

async function matchpassword(password, user) {
  return await bcrypt.compare(password, user.password);
}

async function jwtSign(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

async function pwd(password) {
  const salt =  bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

async function incrementLoginAttempts(user) {
  // if we have a previous lock that has expired, restart at 1
  var lockExpired = !!(user.lockUntil && user.lockUntil < Date.now());

  if (lockExpired) {
    return user.updateOne(
      {
        loginAttempts: 1,
        lockUntil: null,
      }
    );
  }
  return user
}

async function containsAny(arr1, arr2) {
  return arr1.some(item => arr2.includes(item));
}

async function verify2FA(secret, encoding, token, window) {
  const validated = speakeasy.totp.verify({
    secret,
    encoding,
    token,
    window,
  });
  return validated
}

module.exports = {getVerificationToken, matchpassword, jwtSign, pwd, incrementLoginAttempts, containsAny, verify2FA}