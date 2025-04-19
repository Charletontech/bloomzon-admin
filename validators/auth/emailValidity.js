const path = require("path");
const fs = require("fs");
const {DomainEmail} = require("../../models");

const emailValidity = async (email, accountType) => {
  if (accountType != "seller") return true;
  const allowedDomains = await DomainEmail.findOne({ where: {status: "allowed" }});
  const blockedDomains = await DomainEmail.findOne({ where: {status: "blocked" }});

  const patternString = allowedDomains.domains
    .map((domain) => domain.replace(/\./g, "\\.")) // Escape dots
    .join("|"); // Join with OR operator

  const allowedDomainsRegex = new RegExp(`@(${patternString})$`, "i");
  
  const emailDomain = email.split("@")[1];
  const isEmailValid =
    allowedDomainsRegex.test(email) &&
    !blockedDomains.domains.includes(emailDomain) &&
    accountType == "seller";

  return isEmailValid;
};

module.exports = emailValidity;
