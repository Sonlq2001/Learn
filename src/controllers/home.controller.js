const UserServices = require("../services/user.services");

class HomeController {
  static async homePage(req, res) {
    const result = await UserServices.getListUser();

    res.render("pages/home", { data: result });
  }
}

module.exports = HomeController;
