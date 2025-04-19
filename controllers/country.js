
const asyncHandler = require("../middleware/async");

const {
    addCountry,
    editCountry,
    removeCountry,
    getCountry,
    getOneCountry,
    getRegionCountry
} = require("../services/country");

exports.addCountry = asyncHandler(async (req, res, next) => {
    const responseObj = await addCountry(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editCountry = asyncHandler(async (req, res, next) => {
    const responseObj = await editCountry(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeCountry = asyncHandler(async (req, res, next) => {
    const responseObj = await removeCountry(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});


exports.getCountry = asyncHandler(async (req, res, next) => {
    const responseObj = await getCountry(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneCountry = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneCountry(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});


exports.getRegionCountry = asyncHandler(async (req, res, next) => {
    const responseObj = await getRegionCountry(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

