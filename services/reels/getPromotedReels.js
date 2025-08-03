const { Reels, ReelPromotions, ReelComments } = require("../../models");

const getPromotedReels = async (req, res, next) => {
  const reels = await Reels.findAll({
    include: [
      {
        model: ReelPromotions,
        as: "promotion",
        required: true,
      },
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
};

module.exports = getPromotedReels;
