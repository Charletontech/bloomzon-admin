const { EliteVideo } = require("../../../models");
const deleteFile = require("../../../utils/elite/deleteFile");
const uploadToCloudinary = require("../../../utils/elite/uploadToCloudinary");

const eliteVideo = async (req, next) => {
  const uploadedFiles = req.files;
  try {
    // upload files to cloudinary
    const cloudinaryUploadDetails = {
      video: { secure_url: "" },
      image: { secure_url: "" },
      subtitle: { secure_url: null },
    };

    for (const file of uploadedFiles) {
      const mimeType = file.mimetype;

      // for video
      if (mimeType.startsWith("video/")) {
        const cloudinaryUploadResult = await uploadToCloudinary(
          file.path,
          "bloomzonEliteVideos"
        );
        cloudinaryUploadDetails.video.secure_url =
          cloudinaryUploadResult.secure_url;
        console.log(cloudinaryUploadResult.secure_url);
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

      // for subtitle file
      if (mimeType.startsWith("text/")) {
        const cloudinaryUploadResult = await uploadToCloudinary(
          file.path,
          "bloomzonEliteSubtitles"
        );
        cloudinaryUploadDetails.subtitle.secure_url =
          cloudinaryUploadResult.secure_url;
      }
    }

    // delete files after verifying successful upload to cloudinary
    if (
      cloudinaryUploadDetails.image.secure_url &&
      cloudinaryUploadDetails.video.secure_url
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
      title,
      description,
      category,
      directors,
      starring,
      genres,
      audioLanguage,
      producers,
      studio,
      approvalStatus,
    } = req.body.dataFields;

    const newVideo = await EliteVideo.create({
      uploadedBy: userId,
      title,
      description,
      videoUrl: cloudinaryUploadDetails.video.secure_url,
      thumbnailUrl: cloudinaryUploadDetails.image.secure_url,
      subtitleUrl: cloudinaryUploadDetails.subtitle.secure_url || null,
      category,
      directors: JSON.stringify(directors),
      starring: JSON.stringify(starring),
      genres,
      audioLanguage,
      producers: JSON.stringify(producers),
      studio,
      approvalStatus,
    });

    return `Video successfully uploaded. Video ID: ${newVideo.dataValues.id}`;
  } catch (err) {
    uploadedFiles.forEach((file) => {
      deleteFile(file.path);
    });
    console.log(err);
    throw new Error(err);
  }
};

module.exports = eliteVideo;
