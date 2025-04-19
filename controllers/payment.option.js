
const asyncHandler = require("../middleware/async");

const {
    addPaymentOption,
    editPaymentOption,
    removePaymentOption,
    getPaymentOption,
    getOnePaymentOption,
    editPaymentOptionAdmin,
    getUserPaymentOption,
    getMyPaymentOption
} = require("../services/payment.option");

exports.addPaymentOption = asyncHandler(async (req, res, next) => {
    const responseObj = await addPaymentOption(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editPaymentOption = asyncHandler(async (req, res, next) => {
    const responseObj = await editPaymentOption(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.editPaymentOptionAdmin = asyncHandler(async (req, res, next) => {
    const responseObj = await editPaymentOptionAdmin(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removePaymentOption = asyncHandler(async (req, res, next) => {
    const responseObj = await removePaymentOption(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getPaymentOption = asyncHandler(async (req, res, next) => {
    const responseObj = await getPaymentOption(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOnePaymentOption = asyncHandler(async (req, res, next) => {
    const responseObj = await getOnePaymentOption(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getUserPaymentOption = asyncHandler(async (req, res, next) => {
    const responseObj = await getUserPaymentOption(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getMyPaymentOption = asyncHandler(async (req, res, next) => {
    const responseObj = await getMyPaymentOption(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
