module.exports = (sequelize, Sequelize) => {
    const SellerBusinessShipping = sequelize.define("SellerBShipping", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        type: {
            type: Sequelize.ENUM('shipping', 'pickup', 'self'),
            defaultValue: "shipping",
        }
    });
    return SellerBusinessShipping;
};
