
const asyncHandler = require("../middleware/async");

const {
    addCity,
    editCity,
    removeCity,
    getCity,
    getOneCity,
    getStateCity
} = require("../services/city");

exports.addCity = asyncHandler(async (req, res, next) => {
    const responseObj = await addCity(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editCity = asyncHandler(async (req, res, next) => {
    const responseObj = await editCity(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeCity = asyncHandler(async (req, res, next) => {
    const responseObj = await removeCity(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});


exports.getCity = asyncHandler(async (req, res, next) => {
    const responseObj = await getCity(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneCity = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneCity(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});


exports.getStateCity = asyncHandler(async (req, res, next) => {
    const responseObj = await getStateCity(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

