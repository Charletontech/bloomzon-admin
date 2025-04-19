module.exports = (sequelize, Sequelize) => {
    const BusinessType = sequelize.define("BusinessType", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    });
  
    return BusinessType;
};
