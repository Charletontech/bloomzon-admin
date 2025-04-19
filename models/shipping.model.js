module.exports = (sequelize, Sequelize) => {
    const Shipping = sequelize.define("Shipping", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        rate: {
            type: Sequelize.STRING
        },
        itemRate: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.ENUM("regional", 'national'),
            defaultValue: "regional",
        },
        timing: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("approve", 'decline', 'suspend'),
            defaultValue: "decline",
        },
    });
    return Shipping;
};
