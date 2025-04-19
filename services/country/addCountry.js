const ErrorResponse = require("../../utils/errorResponse");
const {Country} = require("../../models");
const s3Upload = require("../../utils/s3.upload");

const addCountry = async (req) => {
    try {
        const countrys = await  Country.findAll({
            where: [{
                name: req.body.name
            }]
        })
        if(countrys.length>0){
            throw new ErrorResponse(`The country ${req.body.name} already exist`,  401 );
        }
        
        let images_holder = ['countryflag', "countryemblem", "countryorthographic"];
        let images = {}
        if (!req.files || req.files.length === 0) {
            throw new ErrorResponse("Image submission is required", 400);
        }
        let i6 = -1;
        const uploadPromises = req.files.map(async (file) => {
            i6 += 1;
            const result = await s3Upload(
              file.buffer,
              file.originalname,
              file.mimetype,
              images_holder[i6]
            );
            return result;
        });
        images = await Promise.all(uploadPromises);
        const countryflag = images[0]?images[0]:''
        const countryemblem = images[1]?images[1]:''
        const countryorthographic = images[2]?images[2]:''

        return Country.create({ ...req.body, flag: countryflag, emblem: countryemblem, orthographic: countryorthographic});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addCountry;