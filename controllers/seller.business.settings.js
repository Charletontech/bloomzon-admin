
const asyncHandler = require("../middleware/async");

const {
    getEditStore,
    getEditStoreStatus,
    addStore,
    addReturnPolicy,
    addDefaultReturnAddress,
    addShippingDetails,
    addStoreDays,
    addStoreTax,
    addStoreTaxConfirmation,
    addStoreReturnResolution,
    editStoreReturnResolution,
    deleteStoreReturnResolution,
    editStoreReturnResolutionDefault,
    addAppSetting,
    addChangeName,
    addChangeEmail,
    addRequestChangeEmail,
    addRequestToken,
    addChangePhone,
    addRequestChangePhone,
    addChangePassword,
    addVerificationMethod
} = require("../services/seller.business.setting");

exports.getEditStore = asyncHandler(async (req, res, next) => {
    const responseObj = await getEditStore(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.getEditStoreStatus = asyncHandler(async (req, res, next) => {
    const responseObj = await getEditStoreStatus(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addStore = asyncHandler(async (req, res, next) => {
    const responseObj = await addStore(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addReturnPolicy = asyncHandler(async (req, res, next) => {
    const responseObj = await addReturnPolicy(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addDefaultReturnAddress = asyncHandler(async (req, res, next) => {
    const responseObj = await addDefaultReturnAddress(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addShippingDetails = asyncHandler(async (req, res, next) => {
    const responseObj = await addShippingDetails(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addStoreDays = asyncHandler(async (req, res, next) => {
    const responseObj = await addStoreDays(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addStoreTax = asyncHandler(async (req, res, next) => {
    const responseObj = await addStoreTax(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addStoreTaxConfirmation = asyncHandler(async (req, res, next) => {
    const responseObj = await addStoreTaxConfirmation(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});


exports.addStoreReturnResolution = asyncHandler(async (req, res, next) => {
    const responseObj = await addStoreReturnResolution(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editStoreReturnResolution = asyncHandler(async (req, res, next) => {
    const responseObj = await editStoreReturnResolution(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});


exports.deleteStoreReturnResolution = asyncHandler(async (req, res, next) => {
    const responseObj = await deleteStoreReturnResolution(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editStoreReturnResolutionDefault = asyncHandler(async (req, res, next) => {
    const responseObj = await editStoreReturnResolutionDefault(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addAppSetting = asyncHandler(async (req, res, next) => {
    const responseObj = await addAppSetting(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addChangeName = asyncHandler(async (req, res, next) => {
    const responseObj = await addChangeName(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addChangeEmail = asyncHandler(async (req, res, next) => {
    const responseObj = await addChangeEmail(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addRequestChangeEmail = asyncHandler(async (req, res, next) => {
    const responseObj = await addRequestChangeEmail(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addRequestToken = asyncHandler(async (req, res, next) => {
    const responseObj = await addRequestToken(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addChangePhone = asyncHandler(async (req, res, next) => {
    const responseObj = await addChangePhone(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addRequestChangePhone = asyncHandler(async (req, res, next) => {
    const responseObj = await addRequestChangePhone(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});


exports.addChangePassword = asyncHandler(async (req, res, next) => {
    const responseObj = await addChangePassword(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addVerificationMethod = asyncHandler(async (req, res, next) => {
    const responseObj = await addVerificationMethod(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});
