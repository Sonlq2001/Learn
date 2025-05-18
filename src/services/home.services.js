const { conn } = require("../configs/connect-sql");

class HomeServices {
  static async getListUser() {
    const [rows] = await conn.query("SELECT * FROM `user`");
    return rows;
  }
}

module.exports = HomeServices;
