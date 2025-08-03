const { Reels, ReelPromotions } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const promoteReel = async (req, next) => {
  try {
    const { videoId } = req.body;
    const findReel = await Reels.findByPk(videoId);
    if (!findReel?.id) {
      throw next(
        new ErrorResponse(
          "Video Id not found. Can not promote non-existent reel",
          404
        )
      );
    }

    const newPromotion = await ReelPromotions.create(req.body);
    return `Successfully created campaign for reel: ${videoId}`;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = promoteReel;

// const { Op } = require("sequelize");
// const db = require("../models"); // adjust path if needed

// const getPromotedReels = async (req, next) => {
//   try {
//     const today = new Date();

//     const promotedReels = await db.reels.findAll({
//       include: [
//         {
//           model: db.reelPromotions,
//           as: "promotion",
//           where: {
//             isActive: true,
//             startDate: { [Op.lte]: today },
//             endDate: { [Op.gte]: today }
//           },
//           required: true // ensures only reels with active promotions are returned
//         }
//       ]
//     });

//     return promotedReels;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// module.exports = getPromotedReels;
