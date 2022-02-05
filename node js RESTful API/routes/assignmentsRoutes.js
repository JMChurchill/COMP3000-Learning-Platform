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

//get assignment list
router.route("/:id").get(async (req, res) => {
  const query =
    "SELECT TaskName, TaskType FROM Assignments WHERE StudentID = ?";
  pool.query(query, [req.params.id], (error, results) => {
    if (results === null) {
      res.status(204).json({ status: "Not found" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
