module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("Roles", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        permissions: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('permissions').split(';')
            },
            set(val) {
                this.setDataValue('permissions',val.join(';'));
            },
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    });
  
    return Role;
  };