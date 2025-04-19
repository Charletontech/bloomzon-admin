module.exports = (sequelize, Sequelize) => {
    const RolePermissions = sequelize.define("RolePermissions", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        service: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    });
  
    return RolePermissions;
  };