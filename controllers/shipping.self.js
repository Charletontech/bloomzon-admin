
const asyncHandler = require("../middleware/async");

const {
    addShippingSelf,
    editShippingSelf,
    removeShippingSelf,
    getShippingSelf,
    getOneShippingSelf,
    getMyShippingSelf,
    getUserShippingSelf
} = require("../services/shipping.self");

exports.addShippingSelf = asyncHandler(async (req, res, next) => {
    const responseObj = await addShippingSelf(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editShippingSelf = asyncHandler(async (req, res, next) => {
    const responseObj = await editShippingSelf(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeShippingSelf = asyncHandler(async (req, res, next) => {
    const responseObj = await removeShippingSelf(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getShippingSelf = asyncHandler(async (req, res, next) => {
    const responseObj = await getShippingSelf(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneShippingSelf = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneShippingSelf(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getMyShippingSelf = asyncHandler(async (req, res, next) => {
    const responseObj = await getMyShippingSelf(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getUserShippingSelf = asyncHandler(async (req, res, next) => {
    const responseObj = await getUserShippingSelf(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
