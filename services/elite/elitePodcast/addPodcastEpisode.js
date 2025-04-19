const { ElitePodcastEpisode } = require("../../../models");
const deleteFile = require("../../../utils/elite/deleteFile");
const uploadToCloudinary = require("../../../utils/elite/uploadToCloudinary");

const addPodcastEpisode = async (req, next) => {
  const uploadedFiles = req.files;
  const userId = req.user.id;
  try {
    // upload files to cloudinary
    const cloudinaryUploadDetails = {
      audio: { secure_url: "" },
      image: { secure_url: "" },
    };

    for (const file of uploadedFiles) {
      const mimeType = file.mimetype;

      // for audio
      if (mimeType.startsWith("audio/")) {
        const cloudinaryUploadResult = await uploadToCloudinary(
          file.path,
          "bloomzonEliteMusic"
        );
        cloudinaryUploadDetails.audio.secure_url =
          cloudinaryUploadResult.secure_url;
      }

      // for thumnail image
      if (mimeType.startsWith("image/")) {
        const cloudinaryUploadResult = await uploadToCloudinary(
          file.path,
          "bloomzonEliteImages"
        );
        cloudinaryUploadDetails.image.secure_url =
          cloudinaryUploadResult.secure_url;
      }
    }

    // delete files after verifying successful upload to cloudinary
    if (
      cloudinaryUploadDetails.image.secure_url &&
      cloudinaryUploadDetails.audio.secure_url
    ) {
      uploadedFiles.forEach((file) => {
        deleteFile(file.path);
      });
    } else {
      throw new Error(
        "Audio or image was not successfully uploaded to cloudinary as URL was not returned"
      );
    }

    // store audio data in database
    const {
      episodeTitle,
      podcastId,
      description,
      genre,
      guestName,
      duration,
      releaseDate,
    } = req.body.dataFields;
    try {
      const newPodcastEpisode = await ElitePodcastEpisode.create({
        episodeTitle,
        podcastId,
        uploadedBy: userId,
        description,
        genre,
        guestName,
        duration,
        releaseDate,
        episodeAudioUrl: cloudinaryUploadDetails.audio.secure_url,
        thumbnailUrl: cloudinaryUploadDetails.image.secure_url,
      });
      return newPodcastEpisode.id;
    } catch (err) {
      uploadedFiles.forEach((file) => {
        deleteFile(file.path);
      });
      throw new Error("error occurred while storing podcast in database" + err);
    }
  } catch (err) {
    uploadedFiles.forEach((file) => {
      deleteFile(file.path);
    });
    throw new Error(err);
  }
};
module.exports = addPodcastEpisode;
