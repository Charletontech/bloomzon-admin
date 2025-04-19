
const asyncHandler = require("../middleware/async");

const {
    addSPISellerBusiness,
    addIVSellerBusiness,
    addAVSellerBusiness,
    addBASellerBusiness,
    addSISellerBusiness,
    addSMSellerBusiness,
    addUploadFrontIVSellerBusiness,
    addUploadBackIVSellerBusiness,
    addUploadAVSellerBusiness,
    removeSellerBusiness,
    getSellerBusiness,
    getOneSellerBusiness,
    getEditSellerBusiness,
} = require("../services/seller.business");

exports.addSPISellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await addSPISellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addIVSellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await addIVSellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addAVSellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await addAVSellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addBASellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await addBASellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.addSISellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await addSISellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.addSMSellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await addSMSellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.addUploadFrontIVSellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await addUploadFrontIVSellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.addUploadBackIVSellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await addUploadBackIVSellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.addUploadAVSellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await addUploadAVSellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeSellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await removeSellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getSellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await getSellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneSellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneSellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getEditSellerBusiness = asyncHandler(async (req, res, next) => {
    const responseObj = await getEditSellerBusiness(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

