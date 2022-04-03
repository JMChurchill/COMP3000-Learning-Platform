if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}

const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const checkAuth = require("../middleware/checkAuth");

//get the students classes
router.route("/student").get(checkAuth, async (req, res) => {
  const email = req.user.email;
  const password = req.user.password;

  const query = `CALL get_students_classes ("${email}", "${password}")`;
  console.log(query);
  // console.log(query);
  pool.query(query, (error, results) => {
    if (results === null) {
      res.status(204).json({ status: "Not found" });
    } else {
      // console.log(results[0]);
      res.status(200).json({ status: "success", data: results[0] });
    }
  });
});

module.exports = router;
