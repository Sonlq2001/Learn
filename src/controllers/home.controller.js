const HomeServices = require("../services/home.services");

class HomeController {
  static async home(req, res) {
    const result = await HomeServices.getListUser();

    res.render("pages/home", { data: result });
  }
}

module.exports = HomeController;
