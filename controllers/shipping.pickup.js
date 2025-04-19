
const asyncHandler = require("../middleware/async");

const {
    addShippingPickup,
    editShippingPickup,
    removeShippingPickup,
    getShippingPickup,
    getOneShippingPickup,
    getMyShippingPickup,
    getUserShippingPickup,
    editShippingPickupTiming,
    editShippingPickupPackage,
} = require("../services/shipping.pickup");

exports.addShippingPickup = asyncHandler(async (req, res, next) => {
    const responseObj = await addShippingPickup(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editShippingPickup = asyncHandler(async (req, res, next) => {
    const responseObj = await editShippingPickup(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeShippingPickup = asyncHandler(async (req, res, next) => {
    const responseObj = await removeShippingPickup(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getShippingPickup = asyncHandler(async (req, res, next) => {
    const responseObj = await getShippingPickup(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneShippingPickup = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneShippingPickup(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getMyShippingPickup = asyncHandler(async (req, res, next) => {
    const responseObj = await getMyShippingPickup(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getUserShippingPickup = asyncHandler(async (req, res, next) => {
    const responseObj = await getUserShippingPickup(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.editShippingPickupTiming = asyncHandler(async (req, res, next) => {
    const responseObj = await editShippingPickupTiming(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.editShippingPickupPackage = asyncHandler(async (req, res, next) => {
    const responseObj = await editShippingPickupPackage(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
