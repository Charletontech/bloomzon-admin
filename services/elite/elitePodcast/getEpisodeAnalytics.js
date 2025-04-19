const { ElitePodcastAnalytics } = require("../../../models");

const getEpisodeAnalytics = async (req, next) => {
  try {
    const episodeId = req.params.episodeId;
    if (!episodeId) throw new Error("EpisodeId missing");
    const episodeAnalytics = await ElitePodcastAnalytics.findAll({
      where: { podcastEpisodeId: episodeId },
    });
    return episodeAnalytics;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = getEpisodeAnalytics;
