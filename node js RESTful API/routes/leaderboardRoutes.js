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

router.get("/", async (req, res) => {
  const query = "SELECT Email,FirstName,LastName,Xp FROM students";
  pool.query(query, (error, results) => {
    if (results === null) {
      res.status(204).json({ status: "Not found" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
