module.exports = (sequelize, Sequelize) => {
    const SellerBusinessStore = sequelize.define("SellerBStore", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        sellToBusiness: {
            type: Sequelize.ENUM("seller", "manufacturer", "wholeseller"),
            defaultValue: "seller",
        },
        haveUPCs: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isManufacturer: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM("approve", 'decline', 'suspend'),
            defaultValue: "approve",
        },
        storeStatus: {
            type: Sequelize.ENUM("active", 'inactive'),
            defaultValue: "active",
        },
        marketPlaceName: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        marketPlacePhone: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        marketPlaceEmail: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        marketPlaceState: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        marketPlaceTown: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        marketPlaceAddress: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        days: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('days').split(';')
            },
            set(val) {
                this.setDataValue('days', val.join(';') );
            },
        },
        capacity: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        handlingTime: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        taxClass: {
            type: Sequelize.ENUM("individual", 'business'),
            defaultValue: "individual",
        },
        taxUSCitizen: {
            type: Sequelize.ENUM("yes", 'no', 'not sure'),
            defaultValue: "yes",
        },
        taxReturnName: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        taxTradeName: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        taxTradeAddress: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        taxType: {
            type: Sequelize.ENUM("tin"),
            defaultValue: "tin",
        },
        taxNumber: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        taxFileName: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        taxFileDate: {
            type: Sequelize.DATE,
            defaultValue: new Date(),
        },
    });
    return SellerBusinessStore;
};
