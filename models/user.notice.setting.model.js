module.exports = (sequelize, Sequelize) => {
    const UserNoticeSetting = sequelize.define("UserNoticeSetting", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        appAppearance: {
            type: Sequelize.ENUM("round", "block"),
            defaultValue: "round",
        },
        isBuyerMessage: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isBuyerComplaints: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isShipmentReminder: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isAccountUnderReview: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isBConfirmShipmentReminders: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isShipOrderNow: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isLostFeaturedOffer: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isPaymentConfirmation: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isEliteOrderNotification: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isInvalidCreditCard: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isAccountDeativiation: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isPriceQuoteRequest: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isSameDayOrder: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
  
    return UserNoticeSetting;
};
