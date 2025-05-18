const mysql = require("mysql2/promise");

const conn = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true,
});

module.exports = { conn };
