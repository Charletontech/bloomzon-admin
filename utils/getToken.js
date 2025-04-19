const randomize = require("randomatic");
const crypto = require("crypto");

const getToken = async () => {
    const token = randomize("0", 6);

    // Hash token and set to appToken field
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  
    // Set expire
    const tokenHashExpire = Date.now() + 10 * 60 * 1000;
  
    return {token, tokenHash, tokenHashExpire};
};

module.exports = getToken;
