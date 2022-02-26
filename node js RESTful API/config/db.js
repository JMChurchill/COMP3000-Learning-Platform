const mysql = require("mysql2");
const util = require("util");

if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
});

pool.query = util.promisify(pool.query).bind(pool);

// const query = "SELECT * FROM users";
// pool.execute(query, (err, results) => {
//   if (!results) {
//     res.json({ status: "Not found" });
//   } else {
//     res.json(results);
//   }
// });

module.exports = pool;
