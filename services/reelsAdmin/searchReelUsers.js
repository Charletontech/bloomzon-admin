const { Op, Sequelize } = require("sequelize");
const { ReelUsers, Reels } = require("../../models");

const searchReelUsers = async (req, next) => {
  try {
    const { query, limit = 10, page = 1 } = req.query;
    console.log(query, limit, page);

    if (!query || query.trim() === "") {
      throw new Error("Query parameter is required for searching");
    }

    const offset = (page - 1) * limit;

    // Search with LIKE on fullName, email, or pageName
    const { count, rows } = await ReelUsers.findAndCountAll({
      where: {
        [Op.or]: [
          { fullName: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
          { pageName: { [Op.like]: `%${query}%` } },
        ],
      },
      attributes: [
        "fullName",
        "email",
        "status",
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM reels AS reel
            WHERE reel.userId = reel_users.userId
          )`),
          "reels",
        ],
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["fullName", "ASC"]],
      raw: true,
    });

    const data = rows.map((user) => ({
      fullName: user.fullName,
      email: user.email,
      status: user.status,
      reels: parseInt(user.reels, 10) || 0,
    }));

    return {
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(count / limit),
      data,
    };
  } catch (err) {
    throw new Error(err.message || err);
  }
};

module.exports = searchReelUsers;
