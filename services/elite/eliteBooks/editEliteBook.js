const { EliteBook } = require("../../../models");

const editEliteBook = async (req, next) => {
  try {
    const bookId = req.params.bookId.replace(/[:]/gi, "");
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
    } = req.body;
    const foundBook = await EliteBook.findByPk(bookId);
    if (!foundBook) throw new Error(`Book with ID: ${bookId} was not found.`);
    foundBook.title = title || foundBook.title;
    foundBook.bookDescription = bookDescription || foundBook.bookDescription;
    foundBook.totalPages = totalPages || foundBook.totalPages;
    foundBook.genre = genre || foundBook.genre;
    foundBook.language = language || foundBook.language;
    foundBook.dimension = dimension || foundBook.dimension;
    foundBook.authorName = authorName || foundBook.authorName;
    foundBook.authorDescription =
      authorDescription || foundBook.authorDescription;
    foundBook.bookPrice = bookPrice || foundBook.bookPrice;
    foundBook.publisherName = publisherName || foundBook.publisherName;
    foundBook.publicationDate = publicationDate || foundBook.publicationDate;
    foundBook.stickyNotes = stickyNotes ?? foundBook.stickyNotes;
    foundBook.pageFlipOption = pageFlipOption ?? foundBook.pageFlipOption;

    await foundBook.save();
    return foundBook.dataValues;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = editEliteBook;
