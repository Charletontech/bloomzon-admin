module.exports = (sequelize, Sequelize) => {
    const PlanFeature = sequelize.define("PlanFeature", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.ENUM('monthly', 'quarterly', 'biannual', 'yearly')
        },
        description: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        }
    });
  
    return PlanFeature;
};
