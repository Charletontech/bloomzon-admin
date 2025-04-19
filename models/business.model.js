module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define("Business", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        monthlySubscription: {
            type: Sequelize.STRING
        },
        monthlySubscriptionDiscount: {
            type: Sequelize.STRING
        },
        yearlySubscription: {
            type: Sequelize.STRING
        },
        yearlySubscriptionDiscount: {
            type: Sequelize.STRING
        },
    });
  
    return Business;
};
