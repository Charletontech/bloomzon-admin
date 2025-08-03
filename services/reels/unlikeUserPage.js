const { ReelUsers, PageLikes } = require("../../models");

const unLikeUserPage = async (req, next) => {
  try {
    const { likedPageUserId, likingUserId } = req.body;

    // Validate inputs
    if (!likedPageUserId || !likingUserId) {
      throw new Error("Both likedPageUserId and likingUserId are required");
    }
    if (likedPageUserId === likingUserId) {
      throw new Error("Users cannot unlike their own page");
    }

    // Check if the liked page user exists
    const pageUser = await ReelUsers.findOne({
      where: { userId: likedPageUserId },
    });
    if (!pageUser) {
      throw new Error("The page user to be unliked does not exist");
    }

    // Check if the liking user exists
    const likingUser = await ReelUsers.findOne({
      where: { userId: likingUserId },
    });
    if (!likingUser) {
      throw new Error("The user unliking the page does not exist");
    }

    // Check if like exists to unlike
    const existingLike = await PageLikes.findOne({
      where: {
        liked: likedPageUserId,
        likedBy: likingUserId,
      },
    });
    if (!existingLike) {
      return "Page was not liked before";
    }

    await existingLike.destroy();

    if (pageUser.likesCount > 0) {
      await ReelUsers.decrement("likesCount", {
        by: 1,
        where: { userId: likedPageUserId },
      });
    }

    return "Page unliked successfully";
  } catch (err) {
    throw new Error(err.message || err);
  }
};

module.exports = unLikeUserPage;
