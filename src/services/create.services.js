const fs = require("fs");

const { conn } = require("../configs/connect-sql");

class CreateServices {
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
}

module.exports = CreateServices;
