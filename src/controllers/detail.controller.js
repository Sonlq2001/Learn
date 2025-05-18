const DetailServices = require("../services/detail.services");

class HomeController {
  static async detail(req, res) {
    const result = await DetailServices.getListUser();

    res.render("pages/detail", { data: result });
  }
}

module.exports = HomeController;
