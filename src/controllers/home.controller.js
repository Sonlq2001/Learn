const HomeServices = require("../services/home.services");

class HomeController {
  static async home(req, res) {
    const result = await HomeServices.getListUser();

    res.render("pages/home", { data: result });
  }

  static async deleteUser(req, res) {
    const result = await HomeServices.deleteUser(req.params.userId);
    res.json({ message: "Xóa thành công !" });
  }
}

module.exports = HomeController;
