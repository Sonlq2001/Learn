const { conn } = require("../configs/connect-sql");

class DetailServices {
  static async getDetailProfile(id) {
    const [rows] = await conn.query(`SELECT * FROM user WHERE id = ${id}`);
    return rows[0];
  }
}

module.exports = DetailServices;
