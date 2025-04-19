const ErrorResponse = require("../../utils/errorResponse");
const {ProductsCategory, Business, ProductsSubCategory} = require("../../models");


const editBusinessProductSubCategory = async (req) => {
    try {
        const businesspc = await  ProductsSubCategory.findOne({
            where: [{
                id : req.body.productSubCategoryId
            }]
        })
        if(!businesspc){
            throw new ErrorResponse(`The Business product sub category ${req.body.productSubCategoryId} was not found`,  401 );
        }

        const checkBusiness = await ProductsCategory.findOne({
            where: [{
                id: req.body.productCategoryId
            }]
        })
        if(!checkBusiness){
            throw new ErrorResponse(`The Business product category  ${req.body.productCategoryId} was not found`,  401 );
        }

        const businessCheck = await  ProductsSubCategory.findAll({
            where: [{
                name : req.body.name,
                ProductsCategoryId: req.body.productCategoryId
            }]
        })
        if(businessCheck.length>0){
            throw new ErrorResponse(`A Business product sub category ${req.body.name} already exist`,  401 );
        }

        const result = businesspc.update({
            name: req.body.name,
            ProductsCategoryId: req.body.productCategoryId,
            tax: req.body.tax,
            charges: req.body.charges
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editBusinessProductSubCategory;