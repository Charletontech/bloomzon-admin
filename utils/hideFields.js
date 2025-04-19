

async function hideUser() {
    return ["createdAt", "updatedAt", "password", "wallet", "pin", "roles", "referrerAmountEarned", "verificationTokenExpire", "verificationToken", "appActionToken", "appActionTokenExpire"];
};

module.exports = {hideUser}