
const asyncHandler = require("../middleware/async");
const jwt = require("jsonwebtoken");

const {
    getUsers,
    getGuests,
    getSellers,
    getAdmins,
    getUser,
    suspendUser,
    banUser,
    activateUser,
    unBanUser,
} = require("../services/admin");

exports.getUsers = asyncHandler(async (req, res, next) => {
    const responseObj = await getUsers(req);
    res.status(201).json(responseObj);
});

exports.getGuests = asyncHandler(async (req, res, next) => {
    const responseObj = await getGuests(req);
    res.status(201).json(responseObj);
});

exports.getSellers = asyncHandler(async (req, res, next) => {
    const responseObj = await getSellers(req);
    res.status(201).json(responseObj);
});

exports.getAdmins = asyncHandler(async (req, res, next) => {
    const responseObj = await getAdmins(req);
    res.status(201).json(responseObj);
});

exports.getUser = asyncHandler(async (req, res, next) => {
    const responseObj = await getUser(req);
    res.status(201).json(responseObj);
});

exports.suspendUser = asyncHandler(async (req, res, next) => {
    await suspendUser(req);
    res.status(200).json({
      success: true,
      message: "User suspended",
    });
});

exports.banUser = asyncHandler(async (req, res, next) => {
    await banUser(req);
    res.status(200).json({
      success: true,
      message: "User banned",
    });
});

exports.activateUser = asyncHandler(async (req, res, next) => {
    await activateUser(req);
    res.status(200).json({
      success: true,
      message: "User activated",
    });
});

exports.unBanUser = asyncHandler(async (req, res, next) => {
    await unBanUser(req);
    res.status(200).json({
      success: true,
      message: "User unbanned",
    });
});