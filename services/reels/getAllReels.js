const { ReelComments, Reels } = require("../../models");

const getAllReels = async (req, next) => {
  try {
    const reels = await Reels.findAll({
      include: [
        {
          model: ReelComments,
          as: "comments",
          attributes: ["id", "userId", "content", "createdAt"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formatted = reels.map((reel) => ({
      ...reel.toJSON(),
      commentsCount: reel.comments.length,
    }));

    return formatted;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = getAllReels;
