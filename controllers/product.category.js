
const asyncHandler = require("../middleware/async");

const {
    addBusinessProductCategory,
    editBusinessProductCategory,
    removeBusinessProductCategory,
    getBusinessProductCategory,
    getOneBusinessProductCategory,
    getBusinessProductCategoryByBusiness,
} = require("../services/product.category");

exports.addBusinessProductCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await addBusinessProductCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editBusinessProductCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await editBusinessProductCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeBusinessProductCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await removeBusinessProductCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getBusinessProductCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await getBusinessProductCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneBusinessProductCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneBusinessProductCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getBusinessProductCategoryByBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await getBusinessProductCategoryByBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
