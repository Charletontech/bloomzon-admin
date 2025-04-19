
const asyncHandler = require("../middleware/async");

const {
    addBusinessType,
    editBusinessType,
    removeBusinessType,
    getBusinessType,
    getOneBusinessType,
} = require("../services/business.type");

exports.addBusinessType = asyncHandler(async (req, res, next) => {
    const responseObj = await addBusinessType(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editBusinessType = asyncHandler(async (req, res, next) => {
    const responseObj = await editBusinessType(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeBusinessType = asyncHandler(async (req, res, next) => {
    const responseObj = await removeBusinessType(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getBusinessType = asyncHandler(async (req, res, next) => {
    const responseObj = await getBusinessType(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneBusinessType = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneBusinessType(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
