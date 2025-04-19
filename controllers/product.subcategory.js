
const asyncHandler = require("../middleware/async");

const {
    addBusinessProductSubCategory,
    editBusinessProductSubCategory,
    removeBusinessProductSubCategory,
    getBusinessProductSubCategory,
    getOneBusinessProductSubCategory,
    getBusinessProductSubCategoryByCategory,
} = require("../services/product.subcategory");

exports.addBusinessProductSubCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await addBusinessProductSubCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editBusinessProductSubCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await editBusinessProductSubCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeBusinessProductSubCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await removeBusinessProductSubCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getBusinessProductSubCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await getBusinessProductSubCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneBusinessProductSubCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneBusinessProductSubCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getBusinessProductSubCategoryByCategory = asyncHandler(async (req, res, next) => {
    const responseObj = await getBusinessProductSubCategoryByCategory(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
