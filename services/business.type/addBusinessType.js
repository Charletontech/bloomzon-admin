const ErrorResponse = require("../../utils/errorResponse");
const {BusinessType} = require("../../models");


const addBusinessType = async (req) => {
    try {
        const businessTypes = await  BusinessType.findAll({
            where: [{
                name: req.body.name
            }]
        })
        if(businessTypes.length>0){
            throw new ErrorResponse(`The BusinessType ${req.body.name} already exist`,  401 );
        }
        return BusinessType.create(req.body);
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addBusinessType;