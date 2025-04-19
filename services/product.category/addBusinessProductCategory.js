const ErrorResponse = require("../../utils/errorResponse");
const {ProductsCategory, Business} = require("../../models");


const addProductsCategory = async (req) => {
    try {
        const businesssCheck = await  Business.findByPk(req.body.businessId)
        if(!businesssCheck){
            throw new ErrorResponse(`The Business ${req.body.businessId} not found`,  401 );
        }
        const businesss = await  ProductsCategory.findAll({
            where: [{
                name: req.body.name,
                BusinessId: req.body.businessId
            }]
        })
        if(businesss.length>0){
            throw new ErrorResponse(`The Business product category ${req.body.name} already exist`,  401 );
        }
        return ProductsCategory.create({
            name: req.body.name,
            BusinessId: req.body.businessId
        }
        );
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addProductsCategory;