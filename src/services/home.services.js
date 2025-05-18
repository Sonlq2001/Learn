const { conn } = require("../configs/connect-sql");

class HomeServices {
  static async getListUser() {
    const [rows] = await conn.query("SELECT * FROM `user`");
    return rows;
  }

  static async deleteUser(id) {
    await conn.query(`DELETE FROM user WHERE id = ${id}`);
  }
}

module.exports = HomeServices;
