const { Reels, ReelComments } = require("../../models");

const getUserReels = async (req, next) => {
  try {
    const { userId } = req.params;
    const reels = await Reels.findAll({
      where: { userId },
      include: [
        {
          model: ReelComments,
          as: "comments",
          attributes: ["id", "userId", "content", "createdAt"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return reels;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getUserReels;
