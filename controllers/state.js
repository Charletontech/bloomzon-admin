
const asyncHandler = require("../middleware/async");

const {
    addState,
    editState,
    removeState,
    getState,
    getOneState,
    getCountryState
} = require("../services/state");

exports.addState = asyncHandler(async (req, res, next) => {
    const responseObj = await addState(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editState = asyncHandler(async (req, res, next) => {
    const responseObj = await editState(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.removeState = asyncHandler(async (req, res, next) => {
    const responseObj = await removeState(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});


exports.getState = asyncHandler(async (req, res, next) => {
    const responseObj = await getState(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

exports.getOneState = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneState(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});


exports.getCountryState = asyncHandler(async (req, res, next) => {
    const responseObj = await getCountryState(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(200).json(prepare);
});

