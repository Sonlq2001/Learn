const express = require("express");

const AuthController = require("../../controllers/auth.controller");

const router = express.Router();

router.get("/signup", AuthController.signupPage);
router.get("/login", AuthController.loginPage);

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

module.exports = router;
