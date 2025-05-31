const AuthServices = require("../services/auth.services");

class AuthController {
  static async signupPage(req, res) {
    res.render("pages/auth/Signup");
  }

  static async loginPage(req, res) {
    res.render("pages/auth/Login");
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
      maxAge: 1000 * 60 * 2, // 2 phút chẳng hạn
    });
    res.redirect("/");
  }
}

module.exports = AuthController;
