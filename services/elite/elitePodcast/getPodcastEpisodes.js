const { ElitePodcastEpisode } = require("../../../models");

const getPodcastEpisodes = async (req, next) => {
  try {
    const podcastId = req.params.podcastId;
    const allPodcastEpisodes = await ElitePodcastEpisode.findAll({
      where: { podcastId },
    });
    if (allPodcastEpisodes.length === 0)
      throw new Error(
        `No episodes found for this podcast. Podcast ID: ${podcastId}`
      );

    return allPodcastEpisodes;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getPodcastEpisodes;
