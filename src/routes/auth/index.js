const express = require("express");

const AuthController = require("../../controllers/auth.controller");
const router = express.Router();

router.get("/signup", AuthController.signupPage);
router.get("/login", AuthController.loginPage);
router.get("/reset-password", AuthController.resetPasswordPage);
router.get("/otp", AuthController.otpPage);
router.get("/confirm-password", AuthController.confirmPasswordPage);

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.post("/reset-password", AuthController.resetPassword);

router.post("/verify-otp", AuthController.verifyOtp);

module.exports = router;
