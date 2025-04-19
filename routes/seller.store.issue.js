const express = require("express");

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
  addIssueChatSendImage,
  getIssueChat,
  mailIssueReply,
  addIssueChatReply,
} = require("../controllers/seller.store.issue");

const { multerUploads } = require("../middleware/multer");

const router = express.Router();

const {
  protect,
  verified,
  authorize,
  verifyPassword,
} = require("../middleware/auth");


const {
  validateGetOneIssueObj,
  validateAddIssueObj,
  validateRemoveIssueObj,
  validateGetUserIssueObj,
  validateEditIssueObj,
  validateMailIssueObj,
  validateAddIssueChatObj,
  validateAddIssueChatImageObj,
  validateGetIssueChatObj,
  validateMailIssueReplyObj,
  validateAddIssueChatReplyObj
} = require("../validators/seller.store.issue");


router.get("/", protect, verified, authorize("admin"), getIssue);
router.get("/one", protect, verified, authorize("seller", "admin"), validateGetOneIssueObj, getOneIssue);
router.post("/register", protect, verified, authorize("seller"), validateAddIssueObj, addIssue);
router.delete("/remove", protect, verified, authorize("seller", "admin"), validateRemoveIssueObj, removeIssue);
router.get("/user", protect, verified, authorize("admin"), validateGetUserIssueObj, getUserIssue);
router.get("/me", protect, verified, authorize("seller"), getMyIssue);
router.put("/edit", protect, verified, authorize("seller"), validateEditIssueObj, editIssue);
router.post("/mail", protect, verified, authorize("seller"), validateMailIssueObj, mailIssue);
router.post("/mail-reply", protect, verified, authorize("admin"), validateMailIssueReplyObj, mailIssueReply);
router.post("/send-chat-text", protect, verified, authorize("seller"), validateAddIssueChatObj, addIssueChatSend);
router.post("/send-chat-image", protect, verified, authorize("seller"), validateAddIssueChatImageObj, addIssueChatSendImage);
router.get("/chats", protect, verified, authorize("seller", "admin"), validateGetIssueChatObj, getIssueChat);
router.post("/chat-reply", protect, verified, authorize("admin"), validateAddIssueChatReplyObj, addIssueChatReply);

module.exports = router;