
module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("Country", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        abbreviation: {
            type: Sequelize.STRING
        },
        capital: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING,
            // validate: {
            //     len: [1, 5],
            // }
        },
        currency: {
            type: Sequelize.STRING
        },
        population: {
            type: Sequelize.INTEGER
        },
        flag: {
            type: Sequelize.STRING
        },
        emblem: {
            type: Sequelize.STRING
        },
        orthographic: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("active", "inactive")
        },
        
    });
    return Country;
};

