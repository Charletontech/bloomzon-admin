const { EliteBook } = require("../../../models");
const deleteFile = require("../../../utils/elite/deleteFile");
const uploadToCloudinary = require("../../../utils/elite/uploadToCloudinary");

const uploadEliteBook = async (req, next) => {
  const uploadedFiles = Object.values(req.files);
  const userId = req.user.id;
  try {
    // upload files to cloudinary
    const cloudinaryUploadDetails = {
      bookUrl: "",
      coverImageUrl: "",
      authorImageUrl: "",
    };

    for (const file of uploadedFiles) {
      const fieldname = file[0].fieldname;

      // for book
      if (fieldname === "bookFile") {
        const cloudinaryUploadResult = await uploadToCloudinary(
          file[0].path,
          "bloomzonEliteBooks"
        );
        cloudinaryUploadDetails.bookUrl = cloudinaryUploadResult.secure_url;
      }

      // for cover image
      if (fieldname === "coverImage") {
        const cloudinaryUploadResult = await uploadToCloudinary(
          file[0].path,
          "bloomzonEliteImages",
          "raw"
        );
        cloudinaryUploadDetails.coverImageUrl =
          cloudinaryUploadResult.secure_url;
      }

      // for author image
      if (fieldname === "authorImage") {
        const cloudinaryUploadResult = await uploadToCloudinary(
          file[0].path,
          "bloomzonEliteImages"
        );
        cloudinaryUploadDetails.authorImageUrl =
          cloudinaryUploadResult.secure_url;
      }
    }

    // delete files after verifying successful upload to cloudinary
    if (
      cloudinaryUploadDetails.coverImageUrl &&
      cloudinaryUploadDetails.authorImageUrl &&
      cloudinaryUploadDetails.bookUrl
    ) {
      uploadedFiles.forEach((file) => {
        deleteFile(file[0].path);
      });
    } else {
      throw new Error(
        "book file or cover image or author image was not successfully uploaded to cloudinary as URL was not returned"
      );
    }

    // save book to database
    const {
      title,
      bookDescription,
      genre,
      language,
      bookPrice,
      totalPages,
      dimension,
      publisherName,
      publicationDate,
      stickyNotes,
      pageFlipOption,
      authorName,
      authorDescription,
    } = req.body.dataFields;
    console.log(req.body.dataFields);

    try {
      const newBook = await EliteBook.create({
        uploadedBy: userId,
        coverImageUrl: cloudinaryUploadDetails.coverImageUrl,
        bookUrl: cloudinaryUploadDetails.bookUrl,
        title,
        bookDescription,
        genre,
        language,
        bookPrice,
        totalPages,
        dimension,
        publisherName,
        publicationDate,
        stickyNotes,
        pageFlipOption,
        authorName,
        authorDescription,
        authorImageUrl: cloudinaryUploadDetails.authorImageUrl,
      });
      return newBook;
    } catch (err) {
      throw new Error("error saving book to database: " + err);
    }
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = uploadEliteBook;
