const UserServices = require("../services/user.services");

class HomeController {
  static async homePage(req, res) {
    const result = await UserServices.getUserList(req.query);

    res.render("pages/home", { data: result, title: "Home Page" });
  }
}

module.exports = HomeController;
