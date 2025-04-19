const { EliteVideo } = require("../../../models");

const getAllEliteVideos = async (req, next) => {
  try {
    const userId = req.user.id;
    const allEliteVideos = await EliteVideo.findAll({
      where: { uploadedBy: userId },
      raw: true,
    });

    if (allEliteVideos.length === 0) {
      console.log("first");
      throw new Error(`No videos were found for this user. User id: ${userId}`);
    }

    return allEliteVideos;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = getAllEliteVideos;
