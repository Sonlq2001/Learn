const AuthServices = require("../services/auth.services");

class AuthController {
  static async signupPage(req, res) {
    res.render("pages/auth/Signup");
  }

  static async loginPage(req, res) {
    res.render("pages/auth/Login");
  }

  static async resetPasswordPage(req, res) {
    res.render("pages/auth/ResetPassword");
  }

  static async otpPage(req, res) {
    res.render("pages/auth/EnterOtp", {
      data: {
        token: req.query.token || "",
      },
    });
  }

  static async confirmPasswordPage(req, res) {
    res.render("pages/auth/ConfirmPassword");
  }

  static async signup(req, res) {
    await AuthServices.signup(req.body);
    res.redirect("/auth/login");
  }

  static async login(req, res) {
    const result = await AuthServices.login(req.body);
    res.cookie("access_token", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 10, // 10 phút chẳng hạn
    });
    res.redirect("/");
  }

  static async logout(req, res) {
    res.clearCookie("access_token");
    res.redirect("/auth/login");
  }

  static async resetPassword(req, res) {
    const result = await AuthServices.resetPassword(req.body);

    if (!result || result.length === 0) {
      return res.redirect("/auth/login");
    }

    const user = result[0];
    const token = await AuthServices.sendMail(user.email);
    res.redirect(`/auth/otp?token=${token}`);
  }

  static async verifyOtp(req, res) {
    await AuthServices.verifyOtp(req.body);
    res.redirect(`/auth/confirm-password`);
  }
}

module.exports = AuthController;
