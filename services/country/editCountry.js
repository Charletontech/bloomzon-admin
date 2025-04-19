const ErrorResponse = require("../../utils/errorResponse");
const {Country, Region} = require("../../models");
const s3Upload = require("../../utils/s3.upload");

const editCountry = async (req) => {
    try {
        const regions = await  Region.findOne({
            where: [{
                id : req.body.RegionId
            }]
        })
        if(!regions){
            throw new ErrorResponse(`The region ${req.body.regionId} was not found`,  401 );
        }

        const country = await  Country.findOne({
            where: [{
                id : req.body.countryId
            }]
        })
        if(!country){
            throw new ErrorResponse(`The country ${req.body.countryId} was not found`,  401 );
        }

        const countryCheck = await  Country.findAll({
            where: [{
                name : req.body.name
            }]
        })
        if(countryCheck.length>0){
            throw new ErrorResponse(`A country ${req.body.name} already exist`,  401 );
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

        const result = country.update({
            name: req.body.name,
            flag: countryflag,
            emblem: countryemblem,
            orthographic: countryorthographic,
            abbreviation: req.body.abbreviation,
            capital: req.body.capital,
            phone: req.body.phone,
            currency: req.body.currency,
            population: req.body.population,
        });
        return result
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = editCountry;