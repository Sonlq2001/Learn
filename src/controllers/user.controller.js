const UserServices = require("../services/user.services");

class UserController {
  static async createPage(req, res) {
    res.render("pages/user/CreateUser", { data: null });
  }

  static async userDetailPage(req, res) {
    const result = await UserServices.userDetail(req.params.id);

    res.render("pages/user/UserDetail", { data: result });
  }

  static async editPage(req, res) {
    const result = await UserServices.userDetail(req.params.id);
    res.render("pages/user/CreateUser", { data: result });
  }

  static async createUser(req, res) {
    await UserServices.createUser({
      data: { ...req.body, avatar: req.file },
    });
    res.redirect("/");
  }

  static async editUser(req, res) {
    await UserServices.editUser({
      payload: req.body,
      file: req.file,
      id: req.params.id,
    });
    res.redirect("/");
  }

  static async getAvatarUser(req, res) {
    const result = await UserServices.getAvatarUser(req.params.id);

    res.send(result.avatar);
  }

  static async deleteUser(req, res) {
    await UserServices.deleteUser(req.params.id);
    return res.json({ message: "Xoá thành công!" });
  }

  static async getUserList(req, res) {
    await UserServices.getUserList();
  }
}

module.exports = UserController;
