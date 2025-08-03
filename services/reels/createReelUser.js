const {
  ReelUsers,
  User,
  Follower,
  ReelsNotificationSettings,
} = require("../../models");
const deleteFile = require("../../utils/elite/deleteFile");
const uploadToCloudinary = require("../../utils/elite/uploadToCloudinary");
const ErrorResponse = require("../../utils/errorResponse");

const createReelUser = async (req, next) => {
  var profilePicDirectory, coverPhotoDirectory;
  try {
    const reelUserData = { ...req.body };

    const authenticatedUser = await User.findOne({
      where: { id: reelUserData.userId },
    });
    if (!authenticatedUser) {
      throw next(
        new ErrorResponse(
          "'userId' was not found. You need to be a registered user to create a reels page.",
          403
        )
      );
    }

    const userExists = await ReelUsers.findOne({
      where: { userId: reelUserData.userId },
    });
    if (userExists) {
      throw next(
        new ErrorResponse("Reel user already exists for this userId", 400)
      );
    }

    // Handle profilePicture upload
    if (req.files.profilePicture && req.files.profilePicture[0]) {
      const profilePicPath = req.files.profilePicture[0].path;
      profilePicDirectory = profilePicPath;
      const profilePicUpload = await uploadToCloudinary(
        profilePicPath,
        "BloomzonReelUsers"
      );
      reelUserData.profilePicture = profilePicUpload.secure_url;
    }

    // Handle coverPhoto upload
    if (req.files.coverPhoto && req.files.coverPhoto[0]) {
      const coverPhotoPath = req.files.coverPhoto[0].path;
      coverPhotoDirectory = coverPhotoPath;
      const coverPhotoUpload = await uploadToCloudinary(
        coverPhotoPath,
        "BloomzonReelUsers"
      );
      reelUserData.coverPhoto = coverPhotoUpload.secure_url;
    }

    const user = await ReelUsers.create(reelUserData);

    // Create a row in Follower (user follows themselves by default)
    await Follower.create({
      followerId: user.id,
      followingId: user.id,
    });

    // Create a row in ReelsNotificationSettings
    await ReelsNotificationSettings.create({
      userId: user.id,
    });

    return user;
  } catch (err) {
    throw new Error(err);
  } finally {
    deleteFile(profilePicDirectory);
    deleteFile(coverPhotoDirectory);
  }
};

module.exports = createReelUser;
