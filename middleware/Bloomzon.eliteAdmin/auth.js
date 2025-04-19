const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateSuperAdmin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.SUPER_ADMIN_SECRET);
    if (
      verified.username !== process.env.SUPER_ADMIN_USERNAME ||
      verified.password !== process.env.SUPER_ADMIN_PASSWORD
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    req.superAdmin = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const generateSuperAdminToken = () => {
  const payload = {
    username: process.env.SUPER_ADMIN_USERNAME,
    password: process.env.SUPER_ADMIN_PASSWORD,
  };
  return jwt.sign(payload, process.env.SUPER_ADMIN_SECRET, { expiresIn: "1h" });
};

module.exports = { authenticateSuperAdmin, generateSuperAdminToken };
