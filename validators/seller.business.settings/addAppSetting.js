const Joi = require("joi");
const ErrorResponse = require("../../utils/errorResponse");

const schema = Joi.object({
  action: Joi.string().valid("appAppearance", "isBuyerMessage", "isBuyerComplaints", "isShipmentReminder", "isAccountUnderReview", "isBConfirmShipmentReminders", "isShipOrderNow", "isLostFeaturedOffer", "isPaymentConfirmation", "isEliteOrderNotification", "isInvalidCreditCard", "isAccountDeativiation", "isPriceQuoteRequest", "isSameDayOrder").required(),
  dataChoice: Joi.boolean().required(),
}).options({ stripUnknown: true });

const validateAddAppSettingObj = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 400));
  }
};

module.exports = validateAddAppSettingObj;
