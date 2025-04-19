
const asyncHandler = require("../middleware/async");

const {
    addBusiness,
    editBusiness,
    removeBusiness,
    getBusiness,
    getOneBusiness,
} = require("../services/business");

exports.addBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await addBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await editBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await removeBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await getBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
