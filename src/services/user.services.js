const fs = require("fs");

const { conn } = require("../configs/connect-sql");

class UserServices {
  static async createUser({ data }) {
    const {
      avatar: { path },
    } = data;

    const fileData = fs.readFileSync(path);

    await conn.query(
      `INSERT INTO user (name, birthday, avatar) VALUES (?, ?, ?)`,
      [data.name, data.birthday, fileData]
    );

    fs.unlinkSync(path);
  }

  static async userDetail(id) {
    const [rows] = await conn.query(`SELECT * FROM user WHERE id = ${id}`);

    return rows[0];
  }

  static async getAvatarUser(id) {
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

  static async deleteUser(id) {
    await conn.query(`DELETE FROM user WHERE id = ${id}`);
  }

  static async getListUser() {
    const [rows] = await conn.query(`SELECT * FROM user`);

    return rows;
  }
}

module.exports = UserServices;
