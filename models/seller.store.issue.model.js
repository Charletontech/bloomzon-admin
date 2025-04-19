module.exports = (sequelize, Sequelize) => {
    const SellerBStoreIssue = sequelize.define("SellerBStoreIssue", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },

        title: {
            type: Sequelize.STRING
        },

        description: {
            type: Sequelize.STRING
        },

        mode: {
            type: Sequelize.ENUM("email", 'call', 'chat'),
            defaultValue: "email",
        },
      
        status: {
            type: Sequelize.ENUM("pending", 'answered', 'transfered'),
            defaultValue: "pending",
        },
        
    });
    return SellerBStoreIssue;
};
