const fs = require("fs");

const { conn } = require("../configs/connect-sql");

class DetailServices {
  static async getDetailProfile(id) {
    const [rows] = await conn.query(`SELECT * FROM user WHERE id = ${id}`);

    return rows[0];
  }

  static async getAvatarProfile(id) {
    const [rows] = await conn.query(`SELECT avatar FROM user WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  }

  static async editUser({ payload, file, id }) {
    let sql = `UPDATE user SET name = ?, birthday = ? WHERE id = ?`;
    let data = [payload.name, payload.birthday, id];

    if (file) {
      const fileData = fs.readFileSync(file.path);
      sql = `UPDATE user SET name = ?, avatar = ?, birthday = ? WHERE id = ?`;
      data = [payload.name, fileData, payload.birthday, id];
    }
    await conn.query(sql, data);
  }
}

module.exports = DetailServices;
