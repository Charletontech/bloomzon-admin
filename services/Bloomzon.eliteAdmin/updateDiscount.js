// === Service: discountService.js ===
const { Discount } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const updateDiscount = async (req, next) => {
  try {
    const { discountId } = req.params;
    const {
      title,
      discountProductId,
      discountType,
      discountAmount,
      startDate,
      endDate,
      eligibleCountries,
      eligibleRegions,
      isActive,
    } = req.body;

    // Find the discount by discountId
    const discount = await Discount.findOne({ where: { discountId } });

    if (!discount) {
      throw new ErrorResponse("Discount not found.", 404);
    }

    // Update the discount details
    discount.title = title || discount.title;
    discount.discountProductId =
      discountProductId || discount.discountProductId;
    discount.discountType = discountType || discount.discountType;
    discount.discountAmount = discountAmount || discount.discountAmount;
    discount.startDate = startDate || discount.startDate;
    discount.endDate = endDate || discount.endDate;
    discount.eligibleCountries =
      eligibleCountries || discount.eligibleCountries;
    discount.eligibleRegions = eligibleRegions || discount.eligibleRegions;
    discount.isActive = isActive !== undefined ? isActive : discount.isActive;

    // Save the updated discount
    await discount.save();

    return discount;
  } catch (err) {
    throw new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500);
  }
};

module.exports = updateDiscount;
