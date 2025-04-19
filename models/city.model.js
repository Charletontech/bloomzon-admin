
module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("City", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("active", "inactive")
        },
    });
    return City;
};

