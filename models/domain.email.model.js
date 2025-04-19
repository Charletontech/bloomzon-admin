module.exports = (sequelize, Sequelize) => {
    const DomainEmail = sequelize.define("DomainEmail", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        domains: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('domains').split(';')
            },
            set(val) {
                this.setDataValue('domains',val.join(';'));
            },
        },
        status: {
            type: Sequelize.ENUM('blocked', 'allowed')
        },
    });
  
    return DomainEmail;
};