
const asyncHandler = require("../middleware/async");

const {
    addRegion,
    editRegion,
    removeRegion,
    getRegion,
    getOneRegion,
} = require("../services/region");

exports.addRegion = asyncHandler(async (req, res, next) => {
    const responseObj = await addRegion(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editRegion = asyncHandler(async (req, res, next) => {
    const responseObj = await editRegion(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeRegion = asyncHandler(async (req, res, next) => {
    const responseObj = await removeRegion(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getRegion = asyncHandler(async (req, res, next) => {
    const responseObj = await getRegion(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneRegion = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneRegion(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
