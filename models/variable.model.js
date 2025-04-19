
module.exports = (sequelize, Sequelize) => {
    const Variable = sequelize.define("Variables", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        referal: {
            type: Sequelize.INTEGER
        }
    });
  
    return Variable;
};