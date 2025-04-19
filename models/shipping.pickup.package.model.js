module.exports = (sequelize, Sequelize) => {
    const ShippingPickupPackage = sequelize.define("ShippingPickupPackage", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        length: {
            type: Sequelize.STRING,
        },
        width: {
            type: Sequelize.STRING,
        },
        height: {
            type: Sequelize.STRING,
        },
        weight: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        isDefault: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM("approve", 'decline', 'suspend'),
            defaultValue: "decline",
        },
    });
    return ShippingPickupPackage;
};
