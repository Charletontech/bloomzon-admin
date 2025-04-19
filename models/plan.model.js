module.exports = (sequelize, Sequelize) => {
    const Plan = sequelize.define("Plan", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    });
  
    return Plan;
};
