const { ReelUsers, Follower } = require("../../models");

const unfollowUser = async (req, next) => {
  try {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
      throw new Error("Both followerId and followingId are required");
    }
    if (followerId === followingId) {
      throw new Error("Users cannot unfollow themselves");
    }

    // Check if follow record exists
    const existingFollow = await Follower.findOne({
      where: { followerId, followingId },
    });
    if (!existingFollow) {
      return "Not following this user";
    }

    // Delete follow record
    await existingFollow.destroy();

    // Decrement counts without going below zero
    const followerUser = await ReelUsers.findOne({
      where: { userId: followerId },
    });
    const followingUser = await ReelUsers.findOne({
      where: { userId: followingId },
    });

    if (followerUser.followingCount > 0) {
      await ReelUsers.decrement("followingCount", {
        by: 1,
        where: { userId: followerId },
      });
    }
    if (followingUser.followersCount > 0) {
      await ReelUsers.decrement("followersCount", {
        by: 1,
        where: { userId: followingId },
      });
    }

    return "Unfollowed user successfully";
  } catch (err) {
    throw new Error(err.message || err);
  }
};

module.exports = unfollowUser;
