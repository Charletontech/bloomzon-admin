const { EliteBook } = require("../../../models");

const deleteEliteBook = async (req) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.bookId;
    if (!bookId) throw new Error("book id missing");
    const findBook = await EliteBook.findByPk(bookId);
    if (!findBook) throw new Error(`Book with Id: ${bookId} was not found`);
    if (findBook.uploadedBy !== userId)
      throw new Error("You cannot delete a book posted by another user");

    const deletedBook = await EliteBook.destroy({ where: { id: findBook.id } });
    return `Book "${findBook.title} successfully deleted`;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
module.exports = deleteEliteBook;
