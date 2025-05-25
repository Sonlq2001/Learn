const CreateServices = require("../services/create.services");
const DetailServices = require("../services/detail.services");

class CreateController {
  static async createPage(req, res) {
    res.render("pages/create", { data: null });
  }

  static async createUser(req, res) {
    await CreateServices.createUser({
      data: { ...req.body, avatar: req.file },
    });
    res.redirect("/");
  }

  static async editPage(req, res) {
    const result = await DetailServices.getDetailProfile(req.params.id);
    res.render("pages/create", { data: result });
  }

  static async editUser(req, res) {
    await DetailServices.editUser({
      payload: req.body,
      file: req.file,
      id: req.params.id,
    });
    res.redirect("/");
  }
}

module.exports = CreateController;
