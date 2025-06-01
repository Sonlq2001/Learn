const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");

const { conn } = require("../configs/connect-sql");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_MAILER_CLIENT_SECRET
);
client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});

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
      expiresIn: "10m",
    });

    return { ...user, token, password: undefined };
  }

  static async resetPassword({ email }) {
    const sqlCheckUser = `SELECT * FROM users WHERE email = ?`;

    const [result] = await conn.query(sqlCheckUser, [email]);

    return result;
  }

  static async sendMail(email) {
    const sqlCheckUser = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await conn.query(sqlCheckUser, [email]);
    if (rows.length === 0) {
      throw new Error("Email not found");
    }
    const user = rows[0];

    const sqlCreateOtp = `INSERT INTO otps (user_id, otp, token, expires_at) VALUES (?, ?, ?, NOW() + INTERVAL 30 SECOND)`;
    const otp = Math.floor(100000 + Math.random() * 900000); // Tạo mã OTP 6 chữ số
    const hashOtp = bcrypt.hashSync(String(otp), 10);

    const tokenOtp = jwt.sign({ id: user.id }, String(otp), {
      expiresIn: "5m",
    });

    await conn.query(sqlCreateOtp, [user.id, hashOtp, tokenOtp]);

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_MAILER_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      to: email,
      subject: "Mã xác thực email",
      html: `<h3>${otp}</h3>`,
    };

    await transport.sendMail(mailOptions);

    return tokenOtp;
  }

  static async verifyOtp({ otp, token }) {
    if (!otp || !token) {
      throw new Error("OTP and token are required");
    }

    const result = jwt.verify(token, otp);
    if (!result || !result.id) {
      throw new Error("Invalid or expired token");
    }
    const userId = result.id;
    const sqlCheckUser = `SELECT * FROM otps WHERE user_id = ?`;
    const [rows] = await conn.query(sqlCheckUser, [userId]);
    if (rows.length === 0) {
      throw new Error("User not found");
    }

    const user = rows[0];

    if (!user) {
      throw new Error("User not found");
    }

    const isOtpValid = bcrypt.compareSync(otp, user.otp);

    if (!isOtpValid) {
      throw new Error("Invalid OTP");
    }
  }
}

module.exports = AuthServices;
