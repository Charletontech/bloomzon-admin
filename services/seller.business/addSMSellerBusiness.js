const ErrorResponse = require("../../utils/errorResponse");
const {SellerBusiness, SellerBusinessStore, SellerBusinessShipping,  Shipping, ShippingSelf, BStoreOption, ShippingPickup} = require("../../models");


const addSMSellerBusiness = async (req) => {
    try {

        const check_sellerBusiness = await  SellerBusiness.findByPk(req.body.sellerBusinessId)
        if(!check_sellerBusiness){
            throw new ErrorResponse(`The seller business ${req.body.sellerBusinessId} not found`,  401 );
        }
        
        if(!check_sellerBusiness.UserId == req.user.id){
            throw new ErrorResponse(`The seller business registration ${req.body.sellerBusinessId} does not belong to you`,  401 );
        }

        const check_sellerBusinessPaymentOption = await  BStoreOption.findOne({
            where: [{
                SellerBusinessId: req.body.sellerBusinessId
            }]
        })
        if(!check_sellerBusinessPaymentOption){
            throw new ErrorResponse(`The seller business registration ${req.body.sellerBusinessId} does not exist`,  401 );
        }

        const check_sellerBusinessStore = await  SellerBusinessStore.findByPk(check_sellerBusinessPaymentOption.SellerBStoreId)
        if(!check_sellerBusinessStore){
            throw new ErrorResponse(`The seller business store ${check_sellerBusinessPaymentOption.SellerBStoreId} not found`,  401 );
        }

        

        for (let v45 = 0; v45 < req.body.shippingId.length; v45++) {
            let isSelf = false;
            const newShippingId = req.body.shippingId[v45];
            const check_shipping = await  Shipping.findByPk(newShippingId)
            if(!check_shipping){
                const check_shipping1 = await  ShippingSelf.findByPk(newShippingId)
                if(!check_shipping1){
                    const check_shipping2 = await  ShippingPickup.findByPk(newShippingId)
                    if(!check_shipping2){
                        throw new ErrorResponse(`The shipping ${newShippingId} not found`,  401 );
                    }else{
                        if(!check_shipping2.UserId == req.user.id){
                            throw new ErrorResponse(`The pickup shipping option ${newShippingId} is not yours`,  401 );
                        }
                        isSelf = 'pickup';
                    }
                }else{
                    if(!check_shipping1.UserId == req.user.id){
                        throw new ErrorResponse(`The self shipping option ${newShippingId} is not yours`,  401 );
                    }
                    isSelf = 'self';
                }
            }else{
                isSelf = 'shipping';
            }

            if(isSelf == 'shipping'){
                const check_sellerBusinessShipping = await  SellerBusinessShipping.findOne({
                    where: [{
                        ShippingId: newShippingId,
                        SellerBStoreId: check_sellerBusinessPaymentOption.SellerBStoreId,
                        type: isSelf,
                    }]
                })
                if(!check_sellerBusinessShipping){
                    await SellerBusinessShipping.create({
                        ShippingId: newShippingId,
                        SellerBStoreId: check_sellerBusinessPaymentOption.SellerBStoreId,
                        type: isSelf,
                    })
                }
            }else if(isSelf == 'self'){
                const check_sellerBusinessShipping = await  SellerBusinessShipping.findOne({
                    where: [{
                        ShippingSelfId: newShippingId,
                        SellerBStoreId: check_sellerBusinessPaymentOption.SellerBStoreId,
                        type: isSelf,
                    }]
                })
                if(!check_sellerBusinessShipping){
                    await SellerBusinessShipping.create({
                        ShippingSelfId: newShippingId,
                        SellerBStoreId: check_sellerBusinessPaymentOption.SellerBStoreId,
                        type: isSelf,
                    })
                }
            }else{
                const check_sellerBusinessShipping = await  SellerBusinessShipping.findOne({
                    where: [{
                        ShippingPickupId: newShippingId,
                        SellerBStoreId: check_sellerBusinessPaymentOption.SellerBStoreId,
                        type: isSelf,
                    }]
                })
                if(!check_sellerBusinessShipping){
                    await SellerBusinessShipping.create({
                        ShippingPickupId: newShippingId,
                        SellerBStoreId: check_sellerBusinessPaymentOption.SellerBStoreId,
                        type: isSelf,
                    })
                }
            }
        }

        return check_sellerBusiness.update({ phase: 6});
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

module.exports = addSMSellerBusiness;