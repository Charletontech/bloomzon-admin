
const asyncHandler = require("../middleware/async");

const {
    addPlan,
    editPlan,
    removePlan,
    getPlan,
    getOnePlan,
} = require("../services/plan");

exports.addPlan = asyncHandler(async (req, res, next) => {
    const responseObj = await addPlan(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editPlan = asyncHandler(async (req, res, next) => {
    const responseObj = await editPlan(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removePlan = asyncHandler(async (req, res, next) => {
    const responseObj = await removePlan(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getPlan = asyncHandler(async (req, res, next) => {
    const responseObj = await getPlan(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOnePlan = asyncHandler(async (req, res, next) => {
    const responseObj = await getOnePlan(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});
