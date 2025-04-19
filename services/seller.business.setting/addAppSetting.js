const ErrorResponse = require("../../utils/errorResponse");
const {UserNoticeSetting} = require("../../models");


const addAppSetting = async (req) => {
    try {
        const action = req.body.action;
        let result = ''
        if(action == 'appAppearance'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    appAppearance: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                appAppearance: req.body.dataChoice
            });
        }

        if(action == 'isBuyerMessage'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isBuyerMessage: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isBuyerMessage: req.body.dataChoice
            });
        }

        if(action == 'isBuyerComplaints'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isBuyerComplaints: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isBuyerComplaints: req.body.dataChoice
            });
        }

        if(action == 'isShipmentReminder'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isShipmentReminder: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isShipmentReminder: req.body.dataChoice
            });
        }

        if(action == 'isAccountUnderReview'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isAccountUnderReview: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isAccountUnderReview: req.body.dataChoice
            });
        }

        if(action == 'isBConfirmShipmentReminders'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isBConfirmShipmentReminders: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isBConfirmShipmentReminders: req.body.dataChoice
            });
        }

        if(action == 'isShipOrderNow'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isShipOrderNow: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isShipOrderNow: req.body.dataChoice
            });
        }

        if(action == 'isLostFeaturedOffer'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isLostFeaturedOffer: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isLostFeaturedOffer: req.body.dataChoice
            });
        }

        if(action == 'isPaymentConfirmation'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isPaymentConfirmation: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isPaymentConfirmation: req.body.dataChoice
            });
        }

        if(action == 'isEliteOrderNotification'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isEliteOrderNotification: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isEliteOrderNotification: req.body.dataChoice
            });
        }

        if(action == 'isInvalidCreditCard'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isInvalidCreditCard: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isInvalidCreditCard: req.body.dataChoice
            });
        }

        if(action == 'isAccountDeativiation'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isAccountDeativiation: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isAccountDeativiation: req.body.dataChoice
            });
        }

        if(action == 'isPriceQuoteRequest'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isPriceQuoteRequest: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isPriceQuoteRequest: req.body.dataChoice
            });
        }

        if(action == 'isSameDayOrder'){
            const card = await UserNoticeSetting.findOne({
                where: [{
                    UserId: req.user.id
                }]
            })
            if(card){
                result = card.update({
                    isSameDayOrder: req.body.dataChoice
                });
            }
            result = await UserNoticeSetting.create({
                UserId: req.user.id,
                isSameDayOrder: req.body.dataChoice
            });
        }
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addAppSetting;