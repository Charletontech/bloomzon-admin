module.exports = (sequelize, Sequelize) => {
    const SellerBStoreResolution = sequelize.define("SellerBStoreRes", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        reasons: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('reasons').split(';')
            },
            set(val) {
                this.setDataValue('reasons', val.join(';') );
            },
        },// "Bought by mistake", "Performance or quality is not good", "No reason given", "Damaged Product", "Wrong item was sent", "Item arrived too late"
        isDefault: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM("approve", 'decline', 'suspend'),
            defaultValue: "decline",
        },
        
    });
    return SellerBStoreResolution;
};
