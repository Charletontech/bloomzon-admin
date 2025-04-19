const ErrorResponse = require("../../utils/errorResponse");
const {Business} = require("../../models");


const addBusiness = async (req) => {
    try {
        const businesss = await  Business.findAll({
            where: [{
                name: req.body.name
            }]
        })
        if(businesss.length>0){
            throw new ErrorResponse(`The Business ${req.body.name} already exist`,  401 );
        }
        return Business.create(req.body);
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addBusiness;