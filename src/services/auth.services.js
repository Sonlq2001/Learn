const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { conn } = require("../configs/connect-sql");

class AuthServices {
  static async signup(payload) {
    const { email, password, name } = payload;
    const sqlCheckUser = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await conn.query(sqlCheckUser, [email]);

    if (rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const sqlInsertUser = `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`;
    await conn.query(sqlInsertUser, [email, hashPassword, name]);
  }

  static async login(payload) {
    const { email, password, name } = payload;
    const sqlCheckUser = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await conn.query(sqlCheckUser, [email]);

    if (rows.length === 0) {
      return { status: 400, message: "Email not found" };
    }
    const user = rows[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return { status: 400, message: "Invalid password" };
    }

    const token = jwt.sign({ id: user.id }, "123", {
      expiresIn: "1h",
    });

    return { ...user, token, password: undefined };
  }
}

module.exports = AuthServices;
