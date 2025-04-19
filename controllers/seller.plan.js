
const asyncHandler = require("../middleware/async");

const {
    addSellerPlan,
    removeSellerPlan,
    getSellerPlan,
    getOneSellerPlan,
    getUserSellerPlan,
} = require("../services/seller.plan");

exports.addSellerPlan = asyncHandler(async (req, res, next) => {
    const responseObj = await addSellerPlan(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});


exports.removeSellerPlan = asyncHandler(async (req, res, next) => {
    const responseObj = await removeSellerPlan(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getSellerPlan = asyncHandler(async (req, res, next) => {
    const responseObj = await getSellerPlan(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneSellerPlan = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneSellerPlan(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getUserSellerPlan = asyncHandler(async (req, res, next) => {
    const responseObj = await getUserSellerPlan(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
