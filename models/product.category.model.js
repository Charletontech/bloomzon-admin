module.exports = (sequelize, Sequelize) => {
    const ProductsCategory = sequelize.define("ProductsCategory", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    });
  
    return ProductsCategory;
};
