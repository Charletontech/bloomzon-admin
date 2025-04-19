module.exports = (sequelize, Sequelize) => {
    const SellerBusiness = sequelize.define("SellerBusiness", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        phase: {
            type: Sequelize.STRING
        },
        spiName: {
            type: Sequelize.STRING
        },
        spiDateOFBirth: {
            type: Sequelize.DATE
        },
        ivIdentityProof: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        ivIdentityProofNumber: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        ivIdentityProofDateOfExpiry: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
        avStreet: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        avCity: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        avState: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        avZip: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        businessOwnershipStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        businessLegalStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        incorperation: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        billingAddress: {
            type: Sequelize.STRING,
            defaultValue: false,
        },
        ivProveFront: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        ivProveback: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        avProve: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        status: {
            type: Sequelize.ENUM('approve', 'decline', 'suspend'),
            defaultValue: "decline",
        },
        returnEmails: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        returnAddressDefault: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        returnInstructions: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        returnAutomation: {
            type: Sequelize.ENUM('personal-authorization', 'bloomzon-authorization-standard', 'bloomzon-authorization-all'),
            defaultValue: "personal-authorization",
        },
    });
  
    return SellerBusiness;
};
