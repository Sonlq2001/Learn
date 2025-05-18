const { conn } = require("../configs/connect-sql");

class CreateServices {
  static async createUser({ data }) {
    await conn.query(`INSERT INTO user (name, birthday) VALUES (? , ?)`, [
      data.name,
      data.birthday,
    ]);
  }
}

module.exports = CreateServices;
