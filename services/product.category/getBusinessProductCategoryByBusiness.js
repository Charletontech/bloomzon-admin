const ErrorResponse = require("../../utils/errorResponse");
const {ProductsCategory, Business, ProductsSubCategory} = require("../../models");


const getBusinessProductCategoryByBusiness = async (req) => {
    try {

        const businesssCheck = await  Business.findByPk(req.query.businessId, {
            include: [{
                model: ProductsCategory,
                include: [{
                    model: ProductsSubCategory
                }]
            }]
        })
        if(!businesssCheck){
            throw new ErrorResponse(`The Business ${req.query.businessId} not found`,  401 );
        }
        return businesssCheck
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getBusinessProductCategoryByBusiness;