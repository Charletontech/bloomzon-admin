const ErrorResponse = require("../../utils/errorResponse");
const {Plan, PlanFeature, SellerPlan, User, Notification, Transaction, SellerBusiness, Country} = require("../../models");
const moment = require("moment")

const addSellerPlan = async (req) => {
    try {
        const userId = req.user.id
        const wallet = req.user.wallet

        const user = await  User.findByPk(userId)
        if(!user){
            throw new ErrorResponse(`The Seller ${userId} not found`,  401 );
        }

        const sellerPlan = await  SellerPlan.findOne({
            where: [{
                UserId: userId
            }]
        })
        if(sellerPlan){
            const today = new Date();
            const expire = sellerPlan.endAt;
            if(Date.parse(today) < Date.parse(expire)){
                throw new ErrorResponse(`The Seller ${user.firstname} ${user.lastname} has a subscription plan already which expires on ${sellerPlan.endAt}`,  401 );
            }
        }

       

        const planFeature = await PlanFeature.findByPk(req.body.planFeatureId)
        if(!planFeature){
            throw new ErrorResponse(`The plan feature ${req.body.planFeatureId} not found`,  401 );
        }

        const plan = await  Plan.findByPk(planFeature.PlanId)
        if(!plan){
            throw new ErrorResponse(`The plan ${planFeature.PlanId} not found`,  401 );
        }

        if(Number(wallet) < Number(planFeature.amount)){
            throw new ErrorResponse(`Insufficient balance`,  401 );
        }

        const countryId = planFeature.CountryId

        const check_sellerBusiness = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!check_sellerBusiness){
            throw new ErrorResponse(`The seller business ${req.body.sellerBusinessId} not found`,  401 );
        }
        if(!check_sellerBusiness.UserId == userId){
            throw new ErrorResponse(`The seller business registration ${req.body.sellerBusinessId} does not belong to you`,  401 );
        }
        if(!check_sellerBusiness.avResidential == countryId){

            const check_ivCountryOfIssue = await  Country.findByPk(countryId)
            if(!check_ivCountryOfIssue){
                throw new ErrorResponse(`The country ${countryId} not found`,  401 );
            }

            const check_ivCountryOfIssue1 = await  Country.findByPk(check_sellerBusiness.avResidential)
            if(!check_ivCountryOfIssue1){
                throw new ErrorResponse(`The country ${countryId} not found`,  401 );
            }

            throw new ErrorResponse(`The plan you choose is for busineses in ${check_ivCountryOfIssue.name} and not for businesses in ${check_ivCountryOfIssue1.name}`,  401 );
        }

        

        let data = {}
        data.UserId = userId
        data.PlanFeatureId = planFeature.id
        
        const start = moment(new Date())
        let end = start.add(1, 'month')
        if(planFeature.name == 'monthly'){
            end = start.add(0, 'month')
        }
        if(planFeature.name == 'quarterly'){
            end = start.add(3, 'month')
        }
        if(planFeature.name == 'biannual'){
            end = start.add(5, 'month')
        }
        if(planFeature.name == 'yearly'){
            end = start.add(0, 'year')
        }
        data.startAt = new Date()
        data.endAt = end
        data.isExpire = false
        data.SellerBusinessId = req.body.sellerBusinessId
        req.user.wallet -= Number(planFeature.amount)
        await req.user.save();

        await Notification.create({
            UserId: userId,
            message: `You have chosen a seller ${planFeature.name} plan at the rate of ${planFeature.amount} and it will expire at ${data.endAt}`,
            category: "subscription",
        });

        await Transaction.create({
            category: "subscription",
            description: `You have chosen a seller ${planFeature.name} plan at the rate of ${planFeature.amount} and it will expire at ${data.endAt}`,
            amount: - Number(planFeature.amount),
            UserId: userId,
        });

        return SellerPlan.create(data);
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addSellerPlan;