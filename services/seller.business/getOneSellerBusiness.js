const ErrorResponse = require("../../utils/errorResponse");
const {
    SellerBusiness, User, Country, Region, PaymentOption, SellerBusinessStore, 
    Shipping, ProductsCategory, ProductsSubCategory
} = require("../../models");
const { hideUser } = require("../../utils/hideFields");

const getOneSellerBusiness = async (req) => {
    console.log(req.user.id)
    try {
        let options = {}
        if(req.user.role == "guest"){
            options.where = { "id": req.query.sellerBusinessId, "UserId":  req.user.id}
        }else{
            options.where = { "id": req.query.sellerBusinessId}
        }
        options.include = [
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
            },
            {
                model: User,
                attributes: {exclude: await hideUser()},
            }
        ]
        const card = await SellerBusiness.findOne(options)
        return card
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = getOneSellerBusiness;
