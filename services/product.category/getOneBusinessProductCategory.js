const ErrorResponse = require("../../utils/errorResponse");
const {ProductsCategory, Business, ProductsSubCategory} = require("../../models");


const getBusinessProductCategory = async (req) => {
    try {
        const businesspc = await ProductsCategory.findOne({
            where: [{
                id : req.query.productCategoryId
            }],
            include: [{
                model: Business
            }],
            include: [{
                model: ProductsSubCategory
            }]
        })
        return businesspc
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getBusinessProductCategory;