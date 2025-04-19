module.exports = (sequelize, Sequelize) => {
    const SellerPlan = sequelize.define("SellerPlan", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        startAt: {
            type: Sequelize.DATE
        },
        endAt: {
            type: Sequelize.DATE
        },
        isExpire: {
            type: Sequelize.BOOLEAN
        }
    });
  
    return SellerPlan;
};
