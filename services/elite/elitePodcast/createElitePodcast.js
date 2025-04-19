const { ElitePodcast } = require("../../../models");
const deleteFile = require("../../../utils/elite/deleteFile");
const uploadToCloudinary = require("../../../utils/elite/uploadToCloudinary");

const createElitePodcast = async (req, next) => {
  const uploadedFile = req.files;
  try {
    let coverImgCloudinaryUrl;
    const cloudinaryUploadResult = await uploadToCloudinary(
      uploadedFile[0].path,
      "bloomzonEliteImages"
    );
    coverImgCloudinaryUrl = cloudinaryUploadResult.secure_url;

    // delete files after verifying successful upload to cloudinary
    if (coverImgCloudinaryUrl) {
      deleteFile(uploadedFile[0].path);
    } else {
      throw new Error(
        "Cover image was not successfully uploaded to cloudinary as URL was not returned"
      );
    }

    // store podcast data in database
    const { title, description, language, category } = req.body.dataFields;
    const userId = req.user.id;
    try {
      const newPodcast = await ElitePodcast.create({
        uploadedBy: userId,
        title,
        description,
        coverImageUrl: coverImgCloudinaryUrl,
        category,
        language,
      });
      console.log(newPodcast);
      return { podcastId: newPodcast.id };
    } catch (err) {
      throw new Error("Error adding podcast to database");
    }
  } catch (err) {
    uploadedFile.forEach((file) => {
      deleteFile(file.path);
    });
    throw new Error(err);
  }
};

module.exports = createElitePodcast;
