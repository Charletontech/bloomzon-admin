const { EliteMusic } = require("../../../models");
const deleteFile = require("../../../utils/elite/deleteFile");
const uploadToCloudinary = require("../../../utils/elite/uploadToCloudinary");

const createEliteMusic = async (req, next) => {
  const uploadedFiles = req.files;
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
        "Video or image was not successfully uploaded to cloudinary as URL was not returned"
      );
    }

    // store video data in database
    const userId = req.user.id;
    const {
      trackName,
      trackDescription,
      trackDuration,
      artistName,
      albumName,
      genre,
      language,
      releaseDate,
    } = req.body.dataFields;

    const newMusic = await EliteMusic.create({
      uploadedBy: userId,
      trackName,
      trackDescription,
      musicUrl: cloudinaryUploadDetails.audio.secure_url,
      thumbnailUrl: cloudinaryUploadDetails.image.secure_url,
      trackDuration,
      artistName,
      albumName,
      genre,
      language,
      releaseDate,
    });

    return `Music successfully uploaded. Song ID: ${newMusic.dataValues.id}`;
  } catch (err) {
    uploadedFiles.forEach((file) => {
      deleteFile(file.path);
    });
    throw new Error(err);
  }
};

module.exports = createEliteMusic;
