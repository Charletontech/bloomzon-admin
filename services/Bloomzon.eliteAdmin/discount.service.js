const { Discount } = require("../../models");
const ErrorResponse = require("../../utils/errorResponse");

const createDiscount = async (req, next) => {
  try {
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

    // Validate if discountType is either percentage or fixed
    if (!["percentage", "fixed"].includes(discountType)) {
      throw new Error(
        "Invalid discount type. It must be either 'percentage' or 'fixed'."
      );
    }

    // Ensure valid date format for startDate and endDate
    if (new Date(startDate) >= new Date(endDate)) {
      throw new Error("End date must be later than start date.");
    }

    const newDiscount = await Discount.create({
      title: title || null,
      discountProductId: discountProductId || null,
      discountType,
      discountAmount,
      startDate,
      endDate,
      eligibleCountries,
      eligibleRegions,
      isActive: isActive || false,
    });

    return newDiscount;
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

const getDiscounts = async (req, next) => {
  try {
    var discounts;
    const discountId = req.query?.discountId;
    if (discountId) {
      discounts = await Discount.findByPk(discountId);
    } else {
      discounts = await Discount.findAll();
    }
    if (discounts === null) {
      throw new Error("Discount ID does not exist");
    }
    return discounts;
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = { createDiscount, getDiscounts };
