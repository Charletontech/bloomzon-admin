module.exports = (sequelize, Sequelize) => {
    const BStoreOption = sequelize.define("BStoreOption", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
    });
  
    return BStoreOption;
};
