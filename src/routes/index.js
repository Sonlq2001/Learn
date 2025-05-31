const express = require("express");

const verifyToken = require("../middlewares/verify-token");

const router = express.Router();

router.use("/auth", require("./auth"));

router.use(verifyToken);

router.use("", require("./home"));
router.use("/user", require("./user"));

module.exports = router;
