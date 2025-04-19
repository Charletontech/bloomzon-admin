const ErrorResponse = require("../../utils/errorResponse");
const {ProductsCategory, Business, ProductsSubCategory} = require("../../models");


const addProductsSubCategory = async (req) => {
    try {
        const businesssCheck = await  ProductsCategory.findByPk(req.body.productCategoryId)
        if(!businesssCheck){
            throw new ErrorResponse(`The Business product category ${req.body.productCategoryId} not found`,  401 );
        }
        const businesss = await  ProductsSubCategory.findAll({
            where: [{
                name: req.body.name,
                ProductsCategoryId: req.body.productCategoryId
            }]
        })
        if(businesss.length>0){
            throw new ErrorResponse(`The Business product sub category ${req.body.name} already exist`,  401 );
        }
        return ProductsSubCategory.create({
            name: req.body.name,
            ProductsCategoryId: req.body.productCategoryId,
            tax: req.body.tax,
            charges: req.body.charges
        }
        );
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addProductsSubCategory;