const { EliteVideosAnalyticsData } = require("../../../models");

const addVideoViewsAnalytics = async (req) => {
  try {
    const { videoId, durationWatched, finishedWatching } = req.body;
    const newAnalytic = await EliteVideosAnalyticsData.create({
      videoId,
      durationWatched,
      finishedWatching,
    });
    return `Analytics data successfully added for video: ${videoId}`;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = addVideoViewsAnalytics;
