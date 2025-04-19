module.exports = (sequelize, Sequelize) => {
    const SellerBStoreIssueMail = sequelize.define("SellerBStoreIssueMail", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        massage: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        files: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('files').split(';')
            },
            set(val) {
                this.setDataValue('files', val.join(';') );
            },
        },
        type: {
            type: Sequelize.ENUM('sent', 'reply')
        },
        seen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return SellerBStoreIssueMail;
};
