const { EliteMusicAnalyticsData } = require("../../../models");

const getAllEliteMusicAnalytics = async (req, next) => {
  try {
    const musicId = req.params.musicId;
    const analytics = await EliteMusicAnalyticsData.findAll({
      where: { musicId },
      raw: true,
    });
    if (analytics.length === 0)
      throw new Error("No analytics was found for this song");

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
      keyMetrics.totalWatchTime += each.durationListened;

      // count how many viewers completed a video and those that didn't
      if (each.finishedListening) {
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

module.exports = getAllEliteMusicAnalytics;
