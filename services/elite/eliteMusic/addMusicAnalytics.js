const { EliteMusicAnalyticsData } = require("../../../models");

const addMusicAnalytics = async (req) => {
  try {
    const { musicId, durationListened, finishedListening } = req.body;
    const newAnalytic = await EliteMusicAnalyticsData.create({
      musicId,
      durationListened,
      finishedListening,
    });
    return `Analytics data successfully added for song: ${musicId}`;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = addMusicAnalytics;
