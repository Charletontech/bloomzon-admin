
const asyncHandler = require("../middleware/async");

const {
    getIssue,
    getOneIssue,
    addIssue,
    removeIssue,
    getUserIssue,
    getMyIssue,
    editIssue,
    mailIssue,
    addIssueChatSend,
    getIssueChat,
    addIssueChatSendImage,
    mailIssueReply,
    addIssueChatReply
} = require("../services/seller.store.issue");

exports.getIssue = asyncHandler(async (req, res, next) => {
    const responseObj = await getIssue(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.getOneIssue = asyncHandler(async (req, res, next) => {
    const responseObj = await getOneIssue(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addIssue = asyncHandler(async (req, res, next) => {
    const responseObj = await addIssue(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.removeIssue = asyncHandler(async (req, res, next) => {
    const responseObj = await removeIssue(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.getUserIssue = asyncHandler(async (req, res, next) => {
    const responseObj = await getUserIssue(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.getMyIssue = asyncHandler(async (req, res, next) => {
    const responseObj = await getMyIssue(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.editIssue = asyncHandler(async (req, res, next) => {
    const responseObj = await editIssue(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.mailIssue = asyncHandler(async (req, res, next) => {
    const responseObj = await mailIssue(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addIssueChatSend = asyncHandler(async (req, res, next) => {
    const responseObj = await addIssueChatSend(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});


exports.getIssueChat = asyncHandler(async (req, res, next) => {
    const responseObj = await getIssueChat(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addIssueChatSendImage = asyncHandler(async (req, res, next) => {
    const responseObj = await addIssueChatSendImage(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.mailIssueReply = asyncHandler(async (req, res, next) => {
    const responseObj = await mailIssueReply(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

exports.addIssueChatReply = asyncHandler(async (req, res, next) => {
    const responseObj = await addIssueChatReply(req);
    const prepare = {
        "success": true,
        "data": responseObj
    }
    res.status(201).json(prepare);
});

