const { ReelUsers } = require("../../models");
const uploadToCloudinary = require("../../utils/elite/uploadToCloudinary");
const { Op } = require("sequelize");

const editReelUser = async (req, next) => {
  try {
    const { userId } = req.params;
    const user = await ReelUsers.findOne({ where: { userId } });
    if (!user) {
      const ErrorResponse = require("../../utils/errorResponse");
      throw next(new ErrorResponse("Reel user not found", 404));
    }

    // check if user is trying to use and existing pageName
    if (req.body.pageName) {
      const existingUser = await ReelUsers.findOne({
        where: { pageName: req.body.pageName, userId: { [Op.ne]: userId } },
      });
      if (existingUser) {
        throw next(new ErrorResponse("Page name already exists", 400));
      }
    }

    // Prepare update data
    const updateData = { ...req.body };

    // Handle profilePicture upload if provided
    if (req.files && req.files.profilePicture && req.files.profilePicture[0]) {
      const profilePicPath = req.files.profilePicture[0].path;
      const profilePicUpload = await uploadToCloudinary(
        profilePicPath,
        "BloomzonReelUsers"
      );
      updateData.profilePicture = profilePicUpload.secure_url;
    }

    // Handle coverPhoto upload if provided
    if (req.files && req.files.coverPhoto && req.files.coverPhoto[0]) {
      const coverPhotoPath = req.files.coverPhoto[0].path;
      const coverPhotoUpload = await uploadToCloudinary(
        coverPhotoPath,
        "BloomzonReelUsers"
      );
      updateData.coverPhoto = coverPhotoUpload.secure_url;
    }

    await user.update(updateData);
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = editReelUser;
