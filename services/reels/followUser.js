const { ReelUsers, Follower } = require("../../models");

const followUser = async (req, next) => {
  try {
    const { followerId, followingId } = req.body;

    // Validate inputs
    if (!followerId || !followingId) {
      throw new Error("Both followerId and followingId are required");
    }
    if (followerId === followingId) {
      throw new Error("Users cannot follow themselves");
    }

    // Check if follower user exists
    const followerUser = await ReelUsers.findOne({
      where: { userId: followerId },
    });
    if (!followerUser) {
      throw new Error("Follower user does not exist");
    }

    // Check if following user exists
    const followingUser = await ReelUsers.findOne({
      where: { userId: followingId },
    });
    if (!followingUser) {
      throw new Error("User to follow does not exist");
    }

    // Check if already following
    const existingFollow = await Follower.findOne({
      where: { followerId, followingId },
    });
    if (existingFollow) {
      return "Already following this user";
    }

    // Create follow record
    await Follower.create({ followerId, followingId });

    await ReelUsers.increment("followingCount", {
      by: 1,
      where: { userId: followerId },
    });
    await ReelUsers.increment("followersCount", {
      by: 1,
      where: { userId: followingId },
    });

    return "Followed user successfully";
  } catch (err) {
    throw new Error(err.message || err);
  }
};

module.exports = followUser;
