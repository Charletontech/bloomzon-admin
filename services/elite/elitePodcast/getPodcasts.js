const { ElitePodcast } = require("../../../models");

const getPodcasts = async (req, next) => {
  try {
    const userId = req.user.id;
    const allPodcasts = await ElitePodcast.findAll({
      where: { uploadedBy: userId },
    });
    if (allPodcasts.length === 0)
      throw new Error("no podcasts found for this user");

    return allPodcasts;
  } catch (err) {
    throw new Error("error retrieving data from database. " + err);
  }
};
module.exports = getPodcasts;
