module.exports = (sequelize, Sequelize) => {
    const Region = sequelize.define("Region", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    });
    return Region;
};