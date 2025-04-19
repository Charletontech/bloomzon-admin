module.exports = (sequelize, Sequelize) => {
    const ShippingSelf = sequelize.define("ShippingSelf", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.ENUM("Standard Shipping", 'Fast-Track Shipping'),
            defaultValue: "Standard Shipping",
        },
        rate: {
            type: Sequelize.STRING
        },
        itemratetype: {
            type: Sequelize.ENUM("peritemweight", 'priceband'),
            defaultValue: "peritemweight",
        },
        itemRate: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING,
            defaultValue: "Seller Address",
        },
        addresstype: {
            type: Sequelize.ENUM("street", 'pobox'),
            defaultValue: "street",
        },
        timing: {
            type: Sequelize.STRING
        },
        regions: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('regions').split(';')
            },
            set(val) {
                this.setDataValue('regions', val.join(';') );
            },
        },
        status: {
            type: Sequelize.ENUM("approve", 'decline', 'suspend'),
            defaultValue: "decline",
        },
    });
    return ShippingSelf;
};
