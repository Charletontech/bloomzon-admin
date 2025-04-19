
const asyncHandler = require("../middleware/async");

const {
    addShipping,
    editShipping,
    removeShipping,
    getShipping,
    getOneShipping,
} = require("../services/shipping");

exports.addShipping = asyncHandler(async (req, res, next) => {
    const responseObj = await addShipping(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editShipping = asyncHandler(async (req, res, next) => {
    const responseObj = await editShipping(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeShipping = asyncHandler(async (req, res, next) => {
    const responseObj = await removeShipping(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getShipping = asyncHandler(async (req, res, next) => {
    const responseObj = await getShipping(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneShipping = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneShipping(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
