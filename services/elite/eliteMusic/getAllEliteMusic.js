const { EliteMusic } = require("../../../models");

const getAllEliteMusic = async (req, next) => {
  try {
    const userId = req.user.id;
    const allEliteMusic = await EliteMusic.findAll({
      where: {
        uploadedBy: userId,
      },
    });
    if (allEliteMusic.length === 0)
      throw new Error("no songs were found for this user");

    return allEliteMusic;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = getAllEliteMusic;
