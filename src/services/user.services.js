const fs = require("fs");

const { conn } = require("../configs/connect-sql");

class UserServices {
  static async createUser({ data }) {
    const {
      avatar: { path },
    } = data;

    const fileData = fs.readFileSync(path);

    await conn.query(
      `INSERT INTO members (name, birthday, avatar) VALUES (?, ?, ?)`,
      [data.name, data.birthday, fileData]
    );

    fs.unlinkSync(path);
  }

  static async userDetail(id) {
    const [rows] = await conn.query(`SELECT * FROM members WHERE id = ${id}`);

    return rows[0];
  }

  static async getAvatarUser(id) {
    const [rows] = await conn.query(`SELECT avatar FROM members WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  }

  static async editUser({ payload, file, id }) {
    let sql = `UPDATE members SET name = ?, birthday = ? WHERE id = ?`;
    let data = [payload.name, payload.birthday, id];

    if (file) {
      const fileData = fs.readFileSync(file.path);
      sql = `UPDATE members SET name = ?, avatar = ?, birthday = ? WHERE id = ?`;
      data = [payload.name, fileData, payload.birthday, id];
    }
    await conn.query(sql, data);
  }

  static async deleteUser(id) {
    await conn.query(`DELETE FROM members WHERE id = ${id}`);
  }

  static async getUserList({ page, per_page, search }) {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(per_page) || 3;

    const offset = (pageNumber - 1) * perPageNumber;
    const [rows] = await conn.query(
      `SELECT * FROM members WHERE name LIKE ? LIMIT ? OFFSET ?`,
      [`%${search ?? ""}%`, perPageNumber, offset]
    );
    const [countRows] = await conn.query(
      `SELECT COUNT(*) as total FROM members WHERE name LIKE ?`,
      [`%${search ?? ""}%`]
    );
    const total = countRows[0].total;
    const totalPage = Math.ceil(total / perPageNumber);
    return { rows, totalPage, page: pageNumber, limit: perPageNumber, search };
  }
}

module.exports = UserServices;
