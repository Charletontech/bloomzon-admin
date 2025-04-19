const express = require("express");

const router = express.Router();

const {
  eliteVideo,
  getAllEliteVideos,
  addVideoViewsAnalytics,
  createEliteMusic,
  getAllEliteMusic,
  getAllEliteMusicAnalytics,
  createElitePodcast,
  addPodcastEpisode,
  getPodcastEpisodes,
  getPodcasts,
  podcastPlayedWebhook,
  getEpisodeAnalytics,
  uploadEliteBook,
  editEliteBook,
  getEliteBooks,
  deleteEliteBook,
  addMusicAnalytics,
  getAllEliteVideoAnalytics,
} = require("../controllers/elite");

const { protect, verified } = require("../middleware/auth");
const { multerFileUpload, multerBookUpload } = require("../middleware/elite");

const {
  validateEliteVideoDetails,
  validateEliteMusicDetails,
  validatePodcastObj,
  addPodcastEpisodeObj,
  podcastPlayedObj,
  validateBookObj,
  editBookObj,
  addVideoViewsAnalyticsObj,
  addMusicAnalyticsObj,
} = require("../validators/elite");

// videos routes
router.post(
  "/create-elite-video",
  protect,
  verified,
  multerFileUpload.array("files"),
  validateEliteVideoDetails,
  eliteVideo
);

router.get("/get-all-elite-videos", protect, verified, getAllEliteVideos);
router.get(
  "/get-elite-video-analytics/:videoId",
  protect,
  verified,
  getAllEliteVideoAnalytics
);

router.post(
  "/add-video-views-analytics",
  addVideoViewsAnalyticsObj,
  addVideoViewsAnalytics
);

// music routes
router.post(
  "/create-elite-music",
  protect,
  multerFileUpload.array("files"),
  validateEliteMusicDetails,
  createEliteMusic
);
router.get("/get-all-elite-music", protect, verified, getAllEliteMusic);
router.get(
  "/get-elite-music-analytics/:musicId",
  protect,
  verified,
  getAllEliteMusicAnalytics
);
router.post("/add-music-analytics", addMusicAnalyticsObj, addMusicAnalytics);

// Podcast routes
router.post(
  "/create-elite-podcast",
  protect,
  verified,
  multerFileUpload.array("files"),
  validatePodcastObj,
  createElitePodcast
);

router.get("/get-podcasts", protect, verified, getPodcasts);

router.post(
  "/add-podcast-episode",
  protect,
  verified,
  multerFileUpload.array("files"),
  addPodcastEpisodeObj,
  addPodcastEpisode
);

router.get(
  "/get-podcast-episodes/:podcastId",
  protect,
  verified,
  getPodcastEpisodes
);

router.get(
  "/get-podcast-episode-analytic/:episodeId",
  protect,
  getEpisodeAnalytics
);

router.post("/webhook/podcast-played", podcastPlayedObj, podcastPlayedWebhook);

// book routes
router.post(
  "/upload-book",
  protect,
  verified,
  multerBookUpload,
  validateBookObj,
  uploadEliteBook
);

router.get("/get-books", protect, verified, getEliteBooks);

router.put(
  "/edit-book-data/:bookId",
  protect,
  verified,
  editBookObj,
  editEliteBook
);

router.get("/delete-book/:bookId", protect, verified, deleteEliteBook);

module.exports = router;
