const { ReelUsers, PageLikes } = require("../../models");

const likeUserPage = async (req, next) => {
  try {
    const { likedPageUserId, likingUserId } = req.body;

    // Validate inputs
    if (!likedPageUserId || !likingUserId) {
      throw new Error("Both likedPageUserId and likingUserId are required");
    }
    if (likedPageUserId === likingUserId) {
      throw new Error("Users cannot like their own page");
    }

    // Check if the liked page user exists
    const pageUser = await ReelUsers.findOne({
      where: { userId: likedPageUserId },
    });
    if (!pageUser) {
      throw new Error("The page user to be liked does not exist");
    }

    // Check if the liking user exists
    const likingUser = await ReelUsers.findOne({
      where: { userId: likingUserId },
    });
    if (!likingUser) {
      throw new Error("The user liking the page does not exist");
    }

    // Check if like already exists
    const existingLike = await PageLikes.findOne({
      where: {
        liked: likedPageUserId,
        likedBy: likingUserId,
      },
    });
    if (existingLike) {
      return "Page already liked";
    }

    // Create the like
    await PageLikes.create({
      liked: likedPageUserId,
      likedBy: likingUserId,
    });

    pageUser.likesCount += 1;
    await pageUser.save();

    return "Page liked successfully";
  } catch (err) {
    // You can call next(err) or throw to handle error middleware elsewhere
    throw new Error(err.message || err);
  }
};

module.exports = likeUserPage;
