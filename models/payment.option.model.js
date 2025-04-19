module.exports = (sequelize, Sequelize) => {
    const PaymentOption = sequelize.define("PaymentOption", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        type: {
            type: Sequelize.ENUM("credit", 'debit', 'wallet'),
            defaultValue: "credit",
        },
        number: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        expiration: {
            type: Sequelize.STRING
        },
        cvv: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("active", 'inactive', 'expired'),
            defaultValue: "active",
        },
        duty: {
            type: Sequelize.ENUM("charge", 'deposit', 'withdrawal'),
            defaultValue: "charge",
        },
        rank: {
            type: Sequelize.ENUM("default", 'others'),
            defaultValue: "others",
        },
        
    });
  
    return PaymentOption;
};
