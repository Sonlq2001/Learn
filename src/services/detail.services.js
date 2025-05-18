const { conn } = require("../configs/connect-sql");

class DetailServices {
  static async getListUser() {
    const [rows] = await conn.query("SELECT * FROM `user`");
    return rows;
  }
}

module.exports = DetailServices;
