const { ElitePodcastAnalytics } = require("../../../models");

const podcastPlayedWebhook = async (req, next) => {
  try {
    const {
      viewerId,
      podcastEpisodeId,
      viewerCountry,
      durationListened,
      completedPlaying,
    } = req.body;

    // add new View record to database
    const newView = await ElitePodcastAnalytics.create({
      viewerId,
      podcastEpisodeId,
      viewerCountry,
      durationListened,
      completedPlaying,
    });
    return "podcast view successfully recorded";
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = podcastPlayedWebhook;
