const { EliteVideosAnalyticsData } = require("../../../models");

const getAllEliteVideoAnalytics = async (req) => {
  try {
    const videoId = req.params.videoId;
    const analytics = await EliteVideosAnalyticsData.findAll({
      where: { videoId },
      raw: true,
    });
    if (analytics.length === 0)
      throw new Error("No analytics was found for this video");

    // configure key metrics
    var keyMetrics = {
      totalViews: "",
      totalWatchTime: 0,
      completionRate: 0,
      dropOffRate: 0,
    };

    // set total views
    keyMetrics.totalViews = analytics.length;

    var completionCount = 0;
    var dropOffCount = 0;
    analytics.forEach((each) => {
      // set total watch time
      keyMetrics.totalWatchTime += each.durationWatched;

      // count how many viewers completed a video and those that didn't
      if (each.finishedWatching) {
        completionCount++;
      } else {
        dropOffCount++;
      }
    });

    // set completion and drop off rates
    keyMetrics.completionRate =
      (completionCount / (completionCount + dropOffCount)) * 100;
    keyMetrics.dropOffRate =
      (dropOffCount / (dropOffCount + completionCount)) * 100;

    const finalData = {
      keyMetrics,
      rawData: analytics,
    };
    return finalData;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = getAllEliteVideoAnalytics;
