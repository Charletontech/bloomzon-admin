

const {Country} = require("../models");
const allCountries = require("./countries.json")

const dryRun = async () => {
    for (let b12 = 0; b12 < allCountries.length; b12++) {
      const country = allCountries[b12];
  
      const data = {
        "name": country.name,
        "abbreviation": country.abbreviation,
        "capital": country.capital,
        "currency": country.currency,
        "phone": country.phone,
        "population": country.population,
        "flag": country.media.flag,
        "emblem": country.media.emblem,
        "orthographic": country.media.orthographic,
        "RegionId": "4294148f-d816-4ba4-a586-b03ad3825d92",
      }
  
      const countrys = await  Country.findAll({
          where: [{
              name: data.name
          }]
      })
      if(countrys.length>0){
          throw new ErrorResponse(`The country ${data.name} already exist`,  401 );
      }
      Country.create(data);
      
    }
}
// dryRun()