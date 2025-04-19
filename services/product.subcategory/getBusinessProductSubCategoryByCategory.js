const ErrorResponse = require("../../utils/errorResponse");
const {ProductsCategory, Business, ProductsSubCategory} = require("../../models");


const getBusinessProductSubCategoryByCategory = async (req) => {
    try {

        const businesssCheck = await  ProductsCategory.findByPk(req.query.productCategoryId, {
            include: [{
                model: ProductsSubCategory,
            },{
                model: Business
            }]
        })
        if(!businesssCheck){
            throw new ErrorResponse(`The Business product category ${req.query.productCategoryId} not found`,  401 );
        }
        return businesssCheck
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getBusinessProductSubCategoryByCategory;