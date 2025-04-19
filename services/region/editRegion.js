const ErrorResponse = require("../../utils/errorResponse");
const {Region} = require("../../models");


const editRegion = async (req) => {
    try {
        const regions = await  Region.findOne({
            where: [{
                id : req.body.regionId
            }]
        })
        if(!regions){
            throw new ErrorResponse(`The region ${req.body.regionId} was not found`,  401 );
        }

        const regionCheck = await  Region.findAll({
            where: [{
                name : req.body.name
            }]
        })
        if(regionCheck.length>0){
            throw new ErrorResponse(`A region ${req.body.name} already exist`,  401 );
        }

        const result = regions.update({
            name: req.body.name
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editRegion;