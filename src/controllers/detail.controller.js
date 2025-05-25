const DetailServices = require("../services/detail.services");

class DetailController {
  static async detail(req, res) {
    const result = await DetailServices.getDetailProfile(req.params.id);

    res.render("pages/detail", { data: result });
  }

  static async avatarUser(req, res) {
    const result = await DetailServices.getAvatarProfile(req.params.id);

    res.send(result.avatar);
  }
}

module.exports = DetailController;
