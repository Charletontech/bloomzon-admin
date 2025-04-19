module.exports = (sequelize, Sequelize) => {
    const ProductsSubCategory = sequelize.define("ProductsSubCategory", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        tax: {
            type: Sequelize.STRING
        },
        charges: {
            type: Sequelize.STRING
        },
    });
  
    return ProductsSubCategory;
};
