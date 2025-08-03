const { Reels } = require("../../models");
const uploadToCloudinary = require("../../utils/elite/uploadToCloudinary");

const createReel = async (req, next) => {
  try {
    // add userId of the poster
    const userId = req.user.id;

    // parse all the fields in the request body
    req.body.keywords = req.body.keywords ? JSON.parse(req.body.keywords) : [];
    req.body.locations = req.body.locations
      ? JSON.parse(req.body.locations)
      : [];
    req.body.moreOptions = JSON.parse(req.body.moreOptions);

    // check if reel is premium and parse it
    const isPremiumReel = req.body.isPremiumReel;
    if (isPremiumReel !== undefined) {
      try {
        const parsed = JSON.parse(isPremiumReel);
        if (typeof parsed === "boolean") {
          req.body.isPremiumReel = parsed;
        } else {
          delete req.body.isPremiumReel;
        }
      } catch (err) {
        delete req.body.isPremiumReel;
      }
    }

    // structure payload
    const payload = Object.entries(req.body);
    const reelData = {};
    for (const element of payload) {
      reelData[element[0]] = element[1];
    }
    reelData.userId = userId; // add userId field to payload

    // upload reel to cloudinary
    const reelFilePath = req.files.reel[0].path;
    const cloudinaryResponse = await uploadToCloudinary(
      reelFilePath,
      "BloomzonReels"
    );
    reelData.videoUrl = cloudinaryResponse.secure_url;

    const newReel = await Reels.create(reelData);

    return "Reel successfully uploaded!";
    // throw next(new ErrorResponse("new new error", 402));
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = createReel;
