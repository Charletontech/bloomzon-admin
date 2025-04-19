const ErrorResponse = require("../../utils/errorResponse");
const {Region} = require("../../models");


const addRegion = async (req) => {
    try {
        const Regions = await  Region.findAll({
            where: [{
                name: req.body.name
            }]
        })
        if(Regions.length>0){
            throw new ErrorResponse(`The Region ${req.body.name} already exist`,  401 );
        }
        return Region.create(req.body);
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addRegion;