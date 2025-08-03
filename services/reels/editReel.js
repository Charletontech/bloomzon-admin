const { Reels } = require("../../models");
const uploadToCloudinary = require("../../utils/elite/uploadToCloudinary");
const ErrorResponse = require("../../utils/errorResponse");

const editReel = async (req, next) => {
  try {
    const reelId = req.params.id;
    const userId = req.user.id;

    // Fetch the existing reel
    const reel = await Reels.findOne({ where: { id: reelId, userId } });
    if (!reel) {
      throw next(new ErrorResponse("Reel not found or User Id not found", 404));
    }

    // Parse JSON fields if present
    if (req.body.keywords) {
      req.body.keywords = JSON.parse(req.body.keywords);
    }
    if (req.body.locations) {
      req.body.locations = JSON.parse(req.body.locations);
    }
    if (req.body.moreOptions) {
      req.body.moreOptions = JSON.parse(req.body.moreOptions);
    }

    // If a new video file is uploaded, replace the existing one
    if (req.files && req.files.reel && req.files.reel[0]) {
      const reelFilePath = req.files.reel[0].path;
      const cloudinaryResponse = await uploadToCloudinary(
        reelFilePath,
        "BloomzonReels"
      );
      req.body.videoUrl = cloudinaryResponse.secure_url;
    }

    // Update the reel
    await reel.update(req.body);

    return "Reel successfully updated!";
  } catch (err) {
    throw new Error(err?.message);
  }
};

module.exports = editReel;
