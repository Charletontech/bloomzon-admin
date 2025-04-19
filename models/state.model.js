
module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("State", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        abbreviation: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        capital: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        status: {
            type: Sequelize.ENUM("active", "inactive")
        },
    });
    return State;
};

