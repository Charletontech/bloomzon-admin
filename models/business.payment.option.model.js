module.exports = (sequelize, Sequelize) => {
    const BPaymentOption = sequelize.define("BPaymentOption", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
    });
  
    return BPaymentOption;
};
