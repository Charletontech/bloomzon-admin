const ErrorResponse = require("../../utils/errorResponse");
const {ProductsCategory, Business} = require("../../models");


const removeBusinessProductCategory = async (req) => {
    try {
        const businesspc = await ProductsCategory.findOne({
            where: [{
                id : req.body.productCategoryId
            }],
            include: [{
                model: Business,
            }]
        })
        if(!businesspc){
            throw new ErrorResponse(`The Business product category ${req.body.productCategoryId} was not found`,  401 );
        }
        const result = businesspc.name + " for " + businesspc.Business.name + " business."
        await businesspc.destroy();

        return `The Business product category ${result} has been removed`
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = removeBusinessProductCategory;