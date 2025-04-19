module.exports = (sequelize, Sequelize) => {
    const SellerBStoreIssueChat = sequelize.define("SellerBStoreIssueChat", {
        
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },

        massageType: {
            type: Sequelize.ENUM('text', 'image', 'audio', 'video', 'sticker', 'emoji')
        },

        message: {
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
    return SellerBStoreIssueChat;
};
