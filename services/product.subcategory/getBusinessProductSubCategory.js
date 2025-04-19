const ErrorResponse = require("../../utils/errorResponse");
const {ProductsCategory, Business, ProductsSubCategory} = require("../../models");


const getBusinessProductSubCategory = async (req) => {
    try {
        const businesspc = await ProductsSubCategory.findAll({
            include: [{
                model: ProductsCategory,
                include: [{
                    model: Business
                }]
            }]
        })
        return businesspc
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getBusinessProductSubCategory;