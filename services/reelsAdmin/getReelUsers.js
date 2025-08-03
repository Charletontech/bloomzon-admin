const { ReelUsers, Reels } = require("../../models");
const { Sequelize } = require("sequelize");

const getReelUsers = async (req) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;

    const { count, rows } = await ReelUsers.findAndCountAll({
      attributes: [
        "fullName",
        "email",
        "status",
        [
          Sequelize.literal(`(
          SELECT COUNT(*)
          FROM reels AS r
          WHERE r.userId = reel_users.userId
        )`),
          "reels",
        ],
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    // Format rows to plain objects and convert reels count to number
    const data = rows.map((user) => {
      const plainUser = user.get({ plain: true });
      plainUser.reels = parseInt(plainUser.reels, 10) || 0;
      return plainUser;
    });

    return {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      data,
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getReelUsers;
