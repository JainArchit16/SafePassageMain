const express = require("express");
const router = express.Router();
const { sendMail } = require("../controllers/mail");

// ********************************************************************************************************
//                                      Contact Email
// ********************************************************************************************************

router.post("/sendMail", sendMail);

module.exports = router;
