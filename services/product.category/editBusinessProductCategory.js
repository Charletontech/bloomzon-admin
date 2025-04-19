const ErrorResponse = require("../../utils/errorResponse");
const {ProductsCategory, Business} = require("../../models");


const editBusinessProductCategory = async (req) => {
    try {
        const businesspc = await  ProductsCategory.findOne({
            where: [{
                id : req.body.productCategoryId
            }]
        })
        if(!businesspc){
            throw new ErrorResponse(`The Business product category ${req.body.productCategoryId} was not found`,  401 );
        }

        const checkBusiness = await Business.findOne({
            where: [{
                id: req.body.businessId
            }]
        })
        if(!checkBusiness){
            throw new ErrorResponse(`The Business  ${req.body.businessId} was not found`,  401 );
        }

        const businessCheck = await  ProductsCategory.findAll({
            where: [{
                name : req.body.name,
                BusinessId: req.body.businessId
            }]
        })
        if(businessCheck.length>0){
            throw new ErrorResponse(`A Business product category ${req.body.name} already exist`,  401 );
        }

        const result = businesspc.update({
            name: req.body.name,
            BusinessId: req.body.businessId
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editBusinessProductCategory;