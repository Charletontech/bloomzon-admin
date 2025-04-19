module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        changeEmail: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM('guest', 'seller', 'admin')
        },
        roles: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('roles').split(';')
            },
            set(val) {
                this.setDataValue('roles', val.join(';') );
            },
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                len: [8, 150],
            }
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        changePhone: {
            type: Sequelize.STRING
        },
        isVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        referralCode: {
            type: Sequelize.STRING,
        },
        verificationTokenExpire: {
            type: Sequelize.DATE
        },
        verificationToken: {
            type: Sequelize.STRING
        },
        lockUntil: {
            type: Sequelize.DATE
        },
        adminLocked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        referredBy: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        referralCode: {
            type: Sequelize.STRING,
            defaultValue: false,
        },
        lastActive: {
            type: Sequelize.DATE
        },
        lastLogin: {
            type: Sequelize.DATE
        },
        appActionToken: {
            type: Sequelize.STRING
        },
        appActionTokenExpire: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
        loginAttempts: {
            type: Sequelize.INTEGER,
            validate: {
                len: [1, 1],
            }
        },
        adminBanned: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isLocked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        referralPaid: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        referrerAmountEarned: {
            type: Sequelize.STRING
        },
        wallet: {
            type: Sequelize.STRING
        },
        pin: {
            type: Sequelize.STRING
        },
        pin_attempts: {
            type: Sequelize.INTEGER,
            validate: {
                len: [1, 1],
            }
        },
        isPinLockedOut: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        verificationMethod: {
            type: Sequelize.ENUM('sms', 'bloomzonApp', 'authenticatorApp'),
            defaultValue: 'bloomzonApp',
        },
        secretAscii: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        secretHex: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        secretBase32: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        secretPathUrl: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
    });
  
    return User;
};
