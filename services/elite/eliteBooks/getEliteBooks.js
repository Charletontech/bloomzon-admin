const { EliteBook } = require("../../../models");

const getEliteBooks = async (req) => {
  try {
    const userId = req.user.id;
    const allBooks = await EliteBook.findAll({
      where: { uploadedBy: userId },
    });
    if (allBooks.length === 0)
      throw new Error("No books where found for this user");
    return allBooks;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
module.exports = getEliteBooks;
