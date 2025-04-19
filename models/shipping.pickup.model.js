module.exports = (sequelize, Sequelize) => {
    const ShippingPickup = sequelize.define("ShippingPickup", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        pincode: {
            type: Sequelize.STRING
        },
        contactname: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
        },
        timing: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        status: {
            type: Sequelize.ENUM("approve", 'decline', 'suspend'),
            defaultValue: "decline",
        },
    });
    return ShippingPickup;
};
