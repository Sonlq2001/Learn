const CreateServices = require("../services/create.services");

class CreateController {
  static async create(req, res) {
    res.render("pages/create");
  }

  static async createUser(req, res) {
    await CreateServices.createUser({ data: req.body });
    res.redirect("/");
  }
}

module.exports = CreateController;
