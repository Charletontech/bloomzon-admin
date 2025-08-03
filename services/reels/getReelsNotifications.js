const { ReelsNotifications } = require("../../models");

const getReelsNotifications = async (req, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await ReelsNotifications.findAndCountAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset,
    });

    return {
      count,
      page: parseInt(page),
      limit: parseInt(limit),
      notifications: rows,
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getReelsNotifications;
