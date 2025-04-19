const ErrorResponse = require("../../utils/errorResponse");
const {BusinessType} = require("../../models");


const editBusinessType = async (req) => {
    try {
        const businessTypes = await  BusinessType.findOne({
            where: [{
                id : req.body.businessTypeId
            }]
        })
        if(!businessTypes){
            throw new ErrorResponse(`The BusinessType ${req.body.businessTypeId} was not found`,  401 );
        }

        const businessTypeCheck = await  BusinessType.findAll({
            where: [{
                name : req.body.name
            }]
        })
        if(businessTypeCheck.length>0){
            throw new ErrorResponse(`A BusinessType ${req.body.name} already exist`,  401 );
        }

        const result = businessTypes.update({
            name: req.body.name
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editBusinessType;