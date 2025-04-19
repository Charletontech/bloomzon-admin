const ErrorResponse = require("../../utils/errorResponse");
const {ProductsCategory, Business, ProductsSubCategory} = require("../../models");


const removeBusinessProductSubCategory = async (req) => {
    try {
        const businesspc = await ProductsSubCategory.findOne({
            where: [{
                id : req.body.productSubCategoryId
            }],
            include: [{
                model: ProductsCategory,
                include: [{
                    model: Business,
                }]
            }]
        })
        if(!businesspc){
            throw new ErrorResponse(`The Business product sub category ${req.body.productSubCategoryId} was not found`,  401 );
        }
        const result = businesspc.name + " of " + businesspc.ProductsCategory?.name + " for " + businesspc.Business?.name + " business."
        await businesspc.destroy();

        return `The Business product Sub category ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeBusinessProductSubCategory;