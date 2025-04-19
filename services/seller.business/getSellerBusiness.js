const ErrorResponse = require("../../utils/errorResponse");
const {
    SellerBusiness, User, Country, Region, PaymentOption, SellerBusinessStore, 
    Shipping, ProductsCategory, ProductsSubCategory
} = require("../../models");


const getSellerBusiness = async (req) => {
    try {
        let options = {}
        if(req.user.role == "guest"){
            options.id = req.user.id
        }
        options.include = [
            { 
                model: SellerBusiness,
                include: [
                    {
                        model: Country,
                        as: "CountryOfCitizenship",
                        include: [{ model: Region }]
                    },
                    {
                        model: Country,
                        as: "CountryOfBirth",
                        include: [{ model: Region }]
                    },
                    {
                        model: Country,
                        as: "CountryOfIssue",
                        include: [{ model: Region }]
                    },
                    {
                        model: Country,
                        as: "Residential",
                        include: [{ model: Region }]
                    },
                    { 
                        model: PaymentOption,
                        through: { attributes: [] } 
                    },
                    { 
                        model: SellerBusinessStore,
                        through: { attributes: [] },
                        include: [
                            {
                                model: Shipping,
                                through: { attributes: [] } 
                            },
                            {
                                model: ProductsSubCategory,
                                include: [{ model: ProductsCategory }]
                            }
                        ]
                    }
                ], 
            }
        ]
        const cards = await User.findAll(options)
        return cards
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getSellerBusiness;