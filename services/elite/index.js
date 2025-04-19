module.exports = {
  // importing all elite videos services
  eliteVideoService: require("./eliteVideo/eliteVideo"),
  getAllEliteVideosService: require("./eliteVideo/getAllEliteVideos"),
  getAllEliteVideoAnalyticsService: require("./eliteVideo/getAllEliteVideoAnalytics"),
  addVideoViewsAnalyticsService: require("./eliteVideo/addVideoViewsAnalytics"),
  // importing all elite music services
  createEliteMusicService: require("./eliteMusic/createEliteMusic"),
  getAllEliteMusicService: require("./eliteMusic/getAllEliteMusic"),
  getAllEliteMusicAnalyticsService: require("./eliteMusic/getAllEliteMusicAnalytics"),
  addMusicAnalyticsService: require("./eliteMusic/addMusicAnalytics"),
  // importing all elite podcast services
  createElitePodcastService: require("./elitePodcast/createElitePodcast"),
  getPodcastsService: require("./elitePodcast/getPodcasts"),
  addPodcastEpisodeService: require("./elitePodcast/addPodcastEpisode"),
  getPodcastEpisodesService: require("./elitePodcast/getPodcastEpisodes"),
  podcastPlayedWebhookService: require("./elitePodcast/podcastPlayedWebhook"),
  getEpisodeAnalyticsService: require("./elitePodcast/getEpisodeAnalytics"),
  // importing all elite books services
  uploadEliteBookService: require("./eliteBooks/uploadEliteBook"),
  editEliteBookService: require("./eliteBooks/editEliteBook"),
  getEliteBooksService: require("./eliteBooks/getEliteBooks"),
  deleteEliteBookService: require("./eliteBooks/deleteEliteBook"),
};
